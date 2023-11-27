import { useState, useEffect } from "react";
import axios from "axios";

const useLocation = () => {
  const [location, setLocation] = useState("US");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const fetchData = async () => {
    setLocationLoading(true);

    try {
      const response = await axios.get("https://api.ipregistry.co/?key=tryout");
      const data = response.data;

      setLocation(data.location.country.name);
      setLocationLoading(false);
    } catch (error) {
      setLocationError(error);
    } finally {
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { location, locationLoading, locationError };
};

export default useLocation;
