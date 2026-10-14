import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_STORAGE_KEY = "@jobpulse_favorites";

const FavoritesContext = createContext({
  favorites: [],
  isLoading: true,
  isFavorite: () => false,
  toggleFavorite: async () => false,
  removeFavorite: async () => {},
  clearFavorites: async () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved favorites from persistent storage on startup
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          }
        }
      } catch (err) {
        console.warn("Failed to load favorites from storage:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Save to persistent storage
  const persistFavorites = async (newList) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newList));
    } catch (err) {
      console.warn("Failed to save favorites to storage:", err);
    }
  };

  // Check if a job ID is currently saved
  const isFavorite = useCallback(
    (jobId) => {
      if (!jobId) return false;
      return favorites.some((j) => j.job_id === jobId || j.raw_id === jobId);
    },
    [favorites]
  );

  // Toggle favorite status
  const toggleFavorite = useCallback(
    async (job) => {
      if (!job || !job.job_id) return false;

      const exists = favorites.some(
        (j) => j.job_id === job.job_id || j.raw_id === job.job_id
      );

      let updatedList;
      let newStatus;

      if (exists) {
        // Remove
        updatedList = favorites.filter(
          (j) => j.job_id !== job.job_id && j.raw_id !== job.job_id
        );
        newStatus = false;
      } else {
        // Add to front of list
        const jobToSave = {
          job_id: job.job_id,
          raw_id: job.raw_id || job.job_id,
          employer_name: job.employer_name,
          employer_logo: job.employer_logo,
          job_title: job.job_title,
          job_employment_type: job.job_employment_type,
          job_location: job.job_location,
          job_apply_link: job.job_apply_link,
          job_salary: job.job_salary,
          job_posted_at_formatted: job.job_posted_at_formatted,
          source: job.source,
          tags: job.tags || [],
          is_remote: job.is_remote,
          saved_at: Date.now(),
        };
        updatedList = [jobToSave, ...favorites];
        newStatus = true;
      }

      setFavorites(updatedList);
      await persistFavorites(updatedList);
      return newStatus;
    },
    [favorites]
  );

  // Remove a favorite by ID
  const removeFavorite = useCallback(
    async (jobId) => {
      if (!jobId) return;
      const updatedList = favorites.filter(
        (j) => j.job_id !== jobId && j.raw_id !== jobId
      );
      setFavorites(updatedList);
      await persistFavorites(updatedList);
    },
    [favorites]
  );

  // Clear all favorites
  const clearFavorites = useCallback(async () => {
    setFavorites([]);
    try {
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
    } catch (err) {
      console.warn("Failed to clear favorites from storage:", err);
    }
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

export default FavoritesContext;
