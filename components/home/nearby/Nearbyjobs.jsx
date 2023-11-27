import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hooks/useFetch";
import useLocation from "../../../hooks/useLocation";

const Nearbyjobs = () => {
  const router = useRouter();
  const { location } = useLocation();
  const { data, isLoading, error } = useFetch("search", {
    query: `Developer jobs ${location}`,
    num_pages: 1,
    page: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity onPress={router.push(`/search/${data}`)}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>{error.message}</Text>
        ) : (
          <View>
            <Text>Jobs in {location}</Text>
            {data?.map((job) => (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
