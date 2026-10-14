import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";

import { ScreenHeaderBtn, NearbyJobCard, JobPulseLoader } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";
import jobService from "../../services/jobService";

const sourceFilters = ["All", "Remotive", "Arbeitnow"];

const JobSearch = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(true);
  const [searchError, setSearchError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSource, setSelectedSource] = useState("All");

  const queryTerm = params.id || "";

  const handleSearch = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setSearchLoader(true);
    }
    setSearchError(null);

    try {
      const results = await jobService.fetchAllJobs({
        query: queryTerm,
        forceRefresh: isRefresh,
      });
      setSearchResult(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(error);
    } finally {
      setSearchLoader(false);
      setRefreshing(false);
    }
  }, [queryTerm]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const filteredResults = useMemo(() => {
    if (selectedSource === "All") return searchResult;
    return searchResult.filter((item) => item.source === selectedSource);
  }, [searchResult, selectedSource]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <FlatList
        data={filteredResults}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{
          padding: SIZES.medium,
          rowGap: SIZES.medium,
          paddingBottom: 40,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleSearch(true)}
            colors={[COLORS.accent]}
          />
        }
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.searchTitle}>"{queryTerm}"</Text>
                <Text style={styles.noOfSearchedJobs}>
                  {searchLoader
                    ? "Searching across open job boards..."
                    : `Found ${filteredResults.length} open position${filteredResults.length === 1 ? "" : "s"}`}
                </Text>
              </View>
            </View>

            {/* Source filter tabs */}
            <View style={styles.filterRow}>
              {sourceFilters.map((source) => (
                <TouchableOpacity
                  key={source}
                  style={styles.sourceBtn(selectedSource === source)}
                  onPress={() => setSelectedSource(source)}
                >
                  <Text style={styles.sourceBtnText(selectedSource === source)}>
                    {source}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {searchLoader && (
              <View style={styles.loaderContainer}>
                <JobPulseLoader
                  size="medium"
                  message={`Finding live matches for "${queryTerm}"...`}
                />
              </View>
            )}

            {searchError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Unable to load job results</Text>
                <TouchableOpacity
                  style={styles.retryBtn}
                  onPress={() => handleSearch(true)}
                >
                  <Text style={styles.retryBtnText}>Retry</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() => {
          if (searchLoader) return null;
          return (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No matching jobs found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search query, or select another source filter.
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
