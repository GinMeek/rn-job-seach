/**
 * Check if an image URL is well-formed and has a valid image extension or remote URL
 */
export const checkImageURL = (url) => {
  if (!url || typeof url !== "string") return false;
  // If it's a valid http/https URL and not empty
  if (!url.startsWith("http://") && !url.startsWith("https://")) return false;
  return true;
};

/**
 * Format location string from city, state, country
 */
export const renderLocation = (city, state, country) => {
  const parts = [city, state, country].filter((p) => p && typeof p === "string" && p.trim().length > 0);
  return parts.length > 0 ? parts.join(", ") : "Remote / Worldwide";
};

/**
 * Convert dates (Unix timestamp in seconds or ms, ISO string, Date object)
 * into human-readable relative time (e.g. "Just now", "2m ago", "3h ago", "2d ago")
 */
export const formatRelativeTime = (dateInput) => {
  if (!dateInput) return "Recently";

  let date;
  if (typeof dateInput === "number") {
    // If it's 10 digits (Unix seconds), convert to ms
    date = new Date(dateInput > 1e11 ? dateInput : dateInput * 1000);
  } else if (typeof dateInput === "string") {
    // If it's a numeric string
    if (/^\d+$/.test(dateInput)) {
      const num = parseInt(dateInput, 10);
      date = new Date(num > 1e11 ? num : num * 1000);
    } else {
      date = new Date(dateInput);
    }
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    return "Recently";
  }

  const timestamp = date.getTime();
  if (isNaN(timestamp)) return "Recently";

  const now = Date.now();
  const diffInSeconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return "1d ago";
  }
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
};

/**
 * Extract 1-2 uppercase letters from company name to display as fallback avatar
 */
export const getCompanyInitials = (name) => {
  if (!name || typeof name !== "string") return "CO";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

/**
 * Strips HTML tags and decodes common HTML entities into clean readable paragraphs
 */
export const stripHtml = (html) => {
  if (!html || typeof html !== "string") return "No description provided.";

  return (
    html
      // Replace header tags and breaks with newlines
      .replace(/<\/?(h[1-6]|p|div|br|tr)\b[^>]*>/gi, "\n")
      // Replace list items with clean bullet indicators
      .replace(/<li\b[^>]*>/gi, "\n• ")
      .replace(/<\/li>/gi, "")
      // Remove all remaining HTML tags
      .replace(/<[^>]+>/g, "")
      // Decode HTML entities
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&rsquo;/gi, "'")
      .replace(/&lsquo;/gi, "'")
      .replace(/&rdquo;/gi, '"')
      .replace(/&ldquo;/gi, '"')
      .replace(/&mdash;/gi, "—")
      .replace(/&ndash;/gi, "–")
      // Collapse multiple empty lines into at most 2
      .replace(/\n\s*\n\s*\n+/g, "\n\n")
      .trim()
  );
};

/**
 * Parses qualifications and responsibilities from HTML job descriptions or tags
 */
export const extractJobHighlights = (html, tags = []) => {
  const highlights = {
    Qualifications: [],
    Responsibilities: [],
  };

  if (!html || typeof html !== "string") {
    if (tags.length > 0) {
      highlights.Qualifications = tags.map((t) => `Experience with ${t}`);
    }
    return highlights;
  }

  // Check for <li> tags in sections
  const reqMatch = html.match(/(?:requirements|qualifications|skills|what we look for)[\s\S]*?(?:<\/ul>|<\/ol>)/i);
  if (reqMatch) {
    const lis = reqMatch[0].match(/<li\b[^>]*>([\s\S]*?)<\/li>/gi);
    if (lis) {
      highlights.Qualifications = lis
        .map((li) => stripHtml(li).replace(/^•\s*/, "").trim())
        .filter((item) => item.length > 0)
        .slice(0, 6);
    }
  }

  const respMatch = html.match(/(?:responsibilities|accountabilities|what you will do|role)[\s\S]*?(?:<\/ul>|<\/ol>)/i);
  if (respMatch) {
    const lis = respMatch[0].match(/<li\b[^>]*>([\s\S]*?)<\/li>/gi);
    if (lis) {
      highlights.Responsibilities = lis
        .map((li) => stripHtml(li).replace(/^•\s*/, "").trim())
        .filter((item) => item.length > 0)
        .slice(0, 6);
    }
  }

  // Fallbacks if not enough explicit points found
  if (highlights.Qualifications.length === 0) {
    if (tags && tags.length > 0) {
      highlights.Qualifications = tags.slice(0, 5).map((t) => `Proficiency with ${t}`);
    } else {
      highlights.Qualifications = [
        "Relevant professional background or equivalent practical experience",
        "Strong communication and problem solving abilities",
        "Ability to collaborate effectively across distributed teams",
      ];
    }
  }

  if (highlights.Responsibilities.length === 0) {
    highlights.Responsibilities = [
      "Drive key project initiatives and deliver high quality results",
      "Collaborate with cross-functional team members to execute roadmap goals",
      "Continuously improve processes, code quality, and technical standards",
    ];
  }

  return highlights;
};

export default {
  checkImageURL,
  renderLocation,
  formatRelativeTime,
  getCompanyInitials,
  stripHtml,
  extractJobHighlights,
};
