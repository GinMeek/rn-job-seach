import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
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
const PAGE_SIZE = 10;

const JobSearch = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const flatListRef = useRef(null);

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(true);
  const [searchError, setSearchError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSource, setSelectedSource] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Reset to page 1 whenever search query or source filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [queryTerm, selectedSource]);

  const filteredResults = useMemo(() => {
    if (selectedSource === "All") return searchResult;
    return searchResult.filter((item) => item.source === selectedSource);
  }, [searchResult, selectedSource]);

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / PAGE_SIZE));

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredResults.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredResults, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const displayTitle = useMemo(() => {
    const lower = queryTerm.toLowerCase().trim();
    if (lower === "latest") return "Latest Positions";
    if (lower === "featured") return "Featured Roles";
    if (lower === "all") return "All Job Positions";
    if (lower === "remote") return "Remote Positions";
    if (lower === "full-time" || lower === "fulltime") return "Full-time Positions";
    return `"${queryTerm}"`;
  }, [queryTerm]);

  const subtitleText = useMemo(() => {
    if (searchLoader) return "Searching across open job boards...";
    if (filteredResults.length === 0) return "No positions found";
    const startItem = (currentPage - 1) * PAGE_SIZE + 1;
    const endItem = Math.min(currentPage * PAGE_SIZE, filteredResults.length);
    return `Showing ${startItem}–${endItem} of ${filteredResults.length} positions • Sorted by newest`;
  }, [searchLoader, filteredResults.length, currentPage]);

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
        ref={flatListRef}
        data={paginatedResults}
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
                <Text style={styles.searchTitle}>{displayTitle}</Text>
                <Text style={styles.noOfSearchedJobs}>{subtitleText}</Text>
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
                  message={`Finding live matches for ${displayTitle}...`}
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
        ListFooterComponent={() => {
          if (searchLoader || totalPages <= 1) return null;
          return (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === 1 && styles.paginationButtonDisabled,
                ]}
                onPress={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.paginationButtonText,
                    currentPage === 1 && styles.paginationButtonTextDisabled,
                  ]}
                >
                  ‹ Prev
                </Text>
              </TouchableOpacity>

              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>
                  {currentPage} / {totalPages}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === totalPages && styles.paginationButtonDisabled,
                ]}
                onPress={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.paginationButtonText,
                    currentPage === totalPages && styles.paginationButtonTextDisabled,
                  ]}
                >
                  Next ›
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
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
