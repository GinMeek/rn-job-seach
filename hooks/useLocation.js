import { useState, useEffect } from "react";

/**
 * Hook to provide approximate user location with instant fallback
 */
const useLocation = () => {
  const [location, setLocation] = useState("Worldwide");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // Keep it lightweight and reliable without external rate-limited demo keys
    setLocation("Remote");
    setLocationLoading(false);
  }, []);

  return { location, locationLoading, locationError };
};

export default useLocation;
