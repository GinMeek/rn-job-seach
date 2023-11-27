import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY_RAPID } from "@env";
import useLocation from "./useLocation";

const rapidApiKey = API_KEY_RAPID;

const useFetch = (endpoint, query) => {
  const { locationError, locationLoading } = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(locationLoading);
  const [error, setError] = useState(locationError);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
