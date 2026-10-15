import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import JobPulseLoader from "../../common/loader/JobPulseLoader";
import useFetch from "../../../hooks/useFetch";

const Popularjobs = ({ activeTab = "All" }) => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState(null);
  const { data, isLoading, error, refetch } = useFetch("popular", {
    category: activeTab,
  });

  const handleCardPress = (item) => {
    setSelectedJob(item.job_id);
    router.push(`/job-details/${item.job_id}`);
  };

  const handleViewAll = () => {
    const targetSearch = activeTab === "All" ? "Featured" : activeTab;
    router.push(`/search/${encodeURIComponent(targetSearch)}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            {activeTab === "All" ? "Featured Roles" : `Featured Roles • ${activeTab}`}
          </Text>
          <Text style={styles.headerSubtitle}>
            {activeTab === "All"
              ? "Curated high-impact positions"
              : `Top ${activeTab} positions sorted by newest`}
          </Text>
        </View>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.headerBtn}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <View style={styles.centerContainer}>
            <JobPulseLoader
              size="medium"
              message={
                activeTab === "All"
                  ? "Curating top featured positions..."
                  : `Curating top ${activeTab} positions...`
              }
            />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Unable to load jobs</Text>
            <TouchableOpacity onPress={refetch} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : data.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              {`No featured ${activeTab === "All" ? "" : activeTab + " "}positions found`}
            </Text>
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handleCardPress={handleCardPress}
                selectedJob={selectedJob}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
