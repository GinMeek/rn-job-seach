import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
  Company,
  JobAbout,
  JobTabs,
  JobFooter,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hooks/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleShare = async () => {
    if (!data || data.length === 0) return;
    const job = data[0];
    try {
      await Share.share({
        message: `Check out this role: ${job.job_title} at ${job.employer_name}\n${job.job_apply_link}`,
        title: job.job_title,
      });
    } catch (err) {
      console.warn("Share error:", err);
    }
  };

  const displayTabContent = () => {
    if (!data || data.length === 0) return null;
    const job = data[0];

    switch (activeTab) {
      case "About":
        return <JobAbout info={job.job_description || "No description provided."} />;

      case "Qualifications":
        return (
          <Specifics
            title="Qualifications & Requirements"
            points={
              job.job_highlights?.Qualifications?.length > 0
                ? job.job_highlights.Qualifications
                : ["No explicit qualifications provided for this role."]
            }
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities & Duties"
            points={
              job.job_highlights?.Responsibilities?.length > 0
                ? job.job_highlights.Responsibilities
                : ["No explicit responsibilities provided for this role."]
            }
          />
        );

      default:
        return null;
    }
  };

  const job = data && data.length > 0 ? data[0] : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={handleShare}
            />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View style={{ flex: 1, padding: 50, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color={COLORS.accent} />
          </View>
        ) : error ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ color: COLORS.tertiary, marginBottom: 10, fontSize: 16 }}>
              Failed to load job details
            </Text>
            <TouchableOpacity
              onPress={refetch}
              style={{
                backgroundColor: COLORS.accentLight,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: COLORS.accent, fontWeight: "600" }}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : !job ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ color: COLORS.gray, fontSize: 16 }}>Job listing not found</Text>
          </View>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 120 }}>
            <Company
              companyLogo={job.employer_logo}
              companyName={job.employer_name}
              jobTitle={job.job_title}
              location={job.job_location}
              postedTime={job.job_posted_at_formatted}
              salary={job.job_salary}
              isRemote={job.is_remote}
              source={job.source}
              employmentType={job.job_employment_type}
            />

            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        )}
      </ScrollView>

      {job && <JobFooter url={job.job_apply_link} />}
    </SafeAreaView>
  );
};

export default JobDetails;
