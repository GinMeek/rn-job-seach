import { useState, useEffect, useCallback } from "react";
import jobService from "../services/jobService";

/**
 * Custom hook to fetch jobs from the unified open API service (Remotive & Arbeitnow)
 * Fully compatible with existing component signatures.
 *
 * @param {string} endpoint - 'popular' | 'latest' | 'search' | 'job-details'
 * @param {object} query - optional query parameters (e.g. { query: 'React' } or { job_id: '123' })
 */
const useFetch = (endpoint, query = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let result = [];

      switch (endpoint) {
        case "popular":
          result = await jobService.getPopularJobs();
          break;

        case "latest":
        case "nearby":
          result = await jobService.getLatestJobs();
          break;

        case "job-details": {
          const jobId = query?.job_id;
          const job = await jobService.getJobById(jobId);
          result = job ? [job] : [];
          break;
        }

        case "search":
        default: {
          const searchQuery = query?.query || "";
          result = await jobService.fetchAllJobs({ query: searchQuery });
          break;
        }
      }

      setData(result);
    } catch (err) {
      console.error("useFetch error:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, query?.query, query?.job_id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
