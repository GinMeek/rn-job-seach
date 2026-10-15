import axios from "axios";
import { formatRelativeTime, stripHtml, extractJobHighlights } from "../utils/index.js";

const REMOTIVE_API_BASE = "https://remotive.com/api/remote-jobs";
const ARBEITNOW_API_BASE = "https://www.arbeitnow.com/api/job-board-api";

// In-memory cache to ensure instant loading and offline resilience
let cachedJobs = [];
let lastFetchTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Normalizes employment type strings (e.g., 'full_time' -> 'Full-time')
 */
const formatJobType = (type) => {
  if (!type) return "Full-time";
  const clean = type.toString().toLowerCase().replace(/[_-]/g, " ");
  if (clean.includes("full")) return "Full-time";
  if (clean.includes("part")) return "Part-time";
  if (clean.includes("contract") || clean.includes("freelance")) return "Contract";
  if (clean.includes("intern")) return "Internship";
  return type.charAt(0).toUpperCase() + type.slice(1);
};

/**
 * Normalizes a Remotive job object
 */
const normalizeRemotiveJob = (item) => {
  const publishedDate = item.publication_date ? new Date(item.publication_date) : new Date();
  const timestamp = isNaN(publishedDate.getTime()) ? Date.now() : publishedDate.getTime();
  const rawDesc = item.description || "";
  const cleanedDesc = stripHtml(rawDesc);
  const highlights = extractJobHighlights(rawDesc, item.tags || []);

  return {
    job_id: `remotive-${item.id}`,
    raw_id: String(item.id),
    employer_name: item.company_name?.trim() || "Remote Company",
    employer_logo: item.company_logo || item.company_logo_url || null,
    job_title: item.title?.trim() || "Software Engineer",
    job_employment_type: formatJobType(item.job_type),
    job_city: "",
    job_state: "",
    job_country: item.candidate_required_location || "Worldwide",
    job_location: item.candidate_required_location || "Worldwide (Remote)",
    job_apply_link: item.url,
    job_description: cleanedDesc,
    job_description_raw: rawDesc,
    job_salary: item.salary && item.salary.trim() ? item.salary.trim() : null,
    job_posted_at_timestamp: timestamp,
    job_posted_at_formatted: formatRelativeTime(timestamp),
    tags: Array.isArray(item.tags) ? item.tags : [],
    category: item.category || "Technology",
    is_remote: true,
    source: "Remotive",
    job_highlights: highlights,
  };
};

/**
 * Normalizes an Arbeitnow job object
 */
const normalizeArbeitnowJob = (item) => {
  // Arbeitnow created_at is a unix timestamp in seconds
  const timestamp = item.created_at ? (item.created_at > 1e11 ? item.created_at : item.created_at * 1000) : Date.now();
  const rawDesc = item.description || "";
  const cleanedDesc = stripHtml(rawDesc);
  const highlights = extractJobHighlights(rawDesc, item.tags || []);
  const loc = item.location ? item.location.trim() : (item.remote ? "Remote" : "Global");

  return {
    job_id: `arbeitnow-${item.slug}`,
    raw_id: item.slug,
    employer_name: item.company_name?.trim() || "Tech Employer",
    employer_logo: null,
    job_title: item.title?.trim() || "Technology Specialist",
    job_employment_type: Array.isArray(item.job_types) && item.job_types.length > 0 ? formatJobType(item.job_types[0]) : "Full-time",
    job_city: loc,
    job_state: "",
    job_country: loc,
    job_location: item.remote ? `${loc} (Remote)` : loc,
    job_apply_link: item.url,
    job_description: cleanedDesc,
    job_description_raw: rawDesc,
    job_salary: null,
    job_posted_at_timestamp: timestamp,
    job_posted_at_formatted: formatRelativeTime(timestamp),
    tags: Array.isArray(item.tags) ? item.tags : [],
    category: Array.isArray(item.tags) && item.tags[0] ? item.tags[0] : "Tech",
    is_remote: Boolean(item.remote),
    source: "Arbeitnow",
    job_highlights: highlights,
  };
};

/**
 * Fetches fresh jobs from both Remotive and Arbeitnow concurrently
 */
export const fetchAllJobs = async ({ forceRefresh = false, query = "" } = {}) => {
  const normalizedQuery = (query || "").trim();
  const lowerQuery = normalizedQuery.toLowerCase();
  const isKeywordView = !normalizedQuery || ["latest", "all", "featured"].includes(lowerQuery);

  const now = Date.now();
  if (!forceRefresh && cachedJobs.length > 0 && (now - lastFetchTime) < CACHE_TTL_MS) {
    if (isKeywordView) {
      return [...cachedJobs].sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp);
    }
    return filterJobs(cachedJobs, normalizedQuery);
  }

  // Optimize remote query: for global views or general types, fetch full limit
  const remotiveUrl = (isKeywordView || ["remote", "full-time", "fulltime"].includes(lowerQuery))
    ? `${REMOTIVE_API_BASE}?limit=100`
    : `${REMOTIVE_API_BASE}?search=${encodeURIComponent(normalizedQuery)}&limit=100`;
  const arbeitnowUrl = `${ARBEITNOW_API_BASE}?page=1`;

  const results = await Promise.allSettled([
    axios.get(remotiveUrl, { timeout: 8000, headers: { Accept: "application/json" } }),
    axios.get(arbeitnowUrl, { timeout: 8000, headers: { Accept: "application/json" } }),
  ]);

  let combined = [];

  // Parse Remotive response
  if (results[0].status === "fulfilled" && results[0].value.data?.jobs) {
    const remotiveJobs = results[0].value.data.jobs.map(normalizeRemotiveJob);
    combined.push(...remotiveJobs);
  } else if (results[0].status === "rejected") {
    console.warn("Remotive API warning:", results[0].reason?.message);
  }

  // Parse Arbeitnow response
  if (results[1].status === "fulfilled" && results[1].value.data?.data) {
    const arbeitnowJobs = results[1].value.data.data.map(normalizeArbeitnowJob);
    combined.push(...arbeitnowJobs);
  } else if (results[1].status === "rejected") {
    console.warn("Arbeitnow API warning:", results[1].reason?.message);
  }

  // If both failed and we have cache, fallback to cache
  if (combined.length === 0 && cachedJobs.length > 0) {
    if (isKeywordView) {
      return [...cachedJobs].sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp);
    }
    return filterJobs(cachedJobs, normalizedQuery);
  }

  // Strictly sort descending by posted timestamp (newest jobs first)
  combined.sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp);

  // Update memory cache
  if (combined.length > 0) {
    cachedJobs = combined;
    lastFetchTime = now;
  }

  if (isKeywordView) {
    return combined;
  }
  return filterJobs(combined, normalizedQuery);
};

/**
 * Filter jobs locally across category, title, company, tags, location, and employment type.
 * Always guarantees descending sort by newest posted date.
 */
export const filterJobs = (jobs, query) => {
  if (!query || !query.trim()) return jobs;
  const q = query.toLowerCase().trim();

  // If query is one of the global chronological views, return all sorted jobs
  if (["latest", "all", "featured"].includes(q)) {
    return [...jobs].sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp);
  }

  let filtered = [];

  if (q === "remote") {
    filtered = jobs.filter(
      (job) => job.is_remote || job.job_location?.toLowerCase().includes("remote")
    );
  } else if (q === "full-time" || q === "fulltime") {
    filtered = jobs.filter(
      (job) => job.job_employment_type?.toLowerCase().includes("full")
    );
  } else {
    filtered = jobs.filter((job) => {
      return (
        job.job_title?.toLowerCase().includes(q) ||
        job.employer_name?.toLowerCase().includes(q) ||
        job.job_location?.toLowerCase().includes(q) ||
        job.job_employment_type?.toLowerCase().includes(q) ||
        job.category?.toLowerCase().includes(q) ||
        job.tags?.some((t) => t.toLowerCase().includes(q)) ||
        job.job_description?.toLowerCase().includes(q)
      );
    });
  }

  // Guarantee strict descending sort by timestamp
  return filtered.sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp);
};

/**
 * Get popular / featured jobs for home carousel.
 * Supports active tab filtering (e.g. 'Python', 'React', 'Remote', 'Full-time', 'All').
 * Always returns up to 10 latest matching positions.
 */
export const getPopularJobs = async (category = "All") => {
  const jobs = await fetchAllJobs();
  if (!category || category.toLowerCase().trim() === "all") {
    return jobs.slice(0, 10);
  }

  const categoryJobs = filterJobs(jobs, category);
  return categoryJobs.slice(0, 10);
};

/**
 * Get latest positions (always newest first).
 */
export const getLatestJobs = async () => {
  const jobs = await fetchAllJobs();
  return jobs.slice(0, 20);
};

/**
 * Get a specific job by ID (with cache lookup and fetch fallback)
 */
export const getJobById = async (jobId) => {
  if (!jobId) return null;

  // 1. Check in cache
  const found = cachedJobs.find((j) => j.job_id === jobId || j.raw_id === jobId);
  if (found) return found;

  // 2. Fetch fresh if not found
  const fresh = await fetchAllJobs({ forceRefresh: true });
  return fresh.find((j) => j.job_id === jobId || j.raw_id === jobId) || null;
};

export default {
  fetchAllJobs,
  filterJobs,
  getPopularJobs,
  getLatestJobs,
  getJobById,
};
