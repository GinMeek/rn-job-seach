import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { ScreenHeaderBtn } from "../components";
import { COLORS, FONT, SIZES, SHADOWS, icons } from "../constants";
import { checkImageURL, getCompanyInitials } from "../utils";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesScreen = () => {
  const router = useRouter();
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  const handleClearAll = () => {
    if (favorites.length === 0) return;
    Alert.alert(
      "Clear All Favorites",
      "Are you sure you want to remove all saved jobs?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", style: "destructive", onPress: () => clearFavorites() },
      ]
    );
  };

  const handleRemoveItem = (job) => {
    Alert.alert(
      "Remove Job",
      `Remove "${job.job_title}" from saved jobs?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeFavorite(job.job_id),
        },
      ]
    );
  };

  const renderFavoriteCard = ({ item }) => {
    const hasValidLogo = checkImageURL(item.employer_logo);

    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.cardContent}
          onPress={() => router.push(`/job-details/${item.job_id}`)}
          activeOpacity={0.7}
        >
          {/* Company Logo or Initials */}
          <View style={styles.logoContainer}>
            {hasValidLogo ? (
              <Image
                source={{ uri: item.employer_logo }}
                style={styles.logoImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.initialsContainer}>
                <Text style={styles.initialsText}>
                  {getCompanyInitials(item.employer_name)}
                </Text>
              </View>
            )}
          </View>

          {/* Job Info */}
          <View style={styles.infoContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.companyName} numberOfLines={1}>
                {item.employer_name}
              </Text>
              {item.job_posted_at_formatted && (
                <Text style={styles.timeText}>
                  🕒 {item.job_posted_at_formatted}
                </Text>
              )}
            </View>

            <Text style={styles.jobTitle} numberOfLines={1}>
              {item.job_title}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.locationWrapper}>
                <Image
                  source={icons.location}
                  style={styles.locationIcon}
                  resizeMode="contain"
                />
                <Text style={styles.locationText} numberOfLines={1}>
                  {item.job_location || "Remote"}
                </Text>
              </View>

              <View style={styles.pillsWrapper}>
                {item.job_salary ? (
                  <View style={styles.salaryPill}>
                    <Text style={styles.salaryPillText} numberOfLines={1}>
                      {item.job_salary}
                    </Text>
                  </View>
                ) : null}

                {item.source ? (
                  <View style={styles.sourcePill(item.source)}>
                    <Text style={styles.sourcePillText(item.source)}>
                      {item.source}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Remove Button */}
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => handleRemoveItem(item)}
          activeOpacity={0.7}
        >
          <Image
            source={icons.heart}
            style={styles.removeBtnIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

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
          headerRight: () =>
            favorites.length > 0 ? (
              <TouchableOpacity
                onPress={handleClearAll}
                style={styles.clearHeaderBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.clearHeaderBtnText}>Clear All</Text>
              </TouchableOpacity>
            ) : null,
          headerTitle: "Saved Jobs",
          headerTitleStyle: {
            fontFamily: FONT.bold,
            fontSize: SIZES.large,
            color: COLORS.primary,
          },
        }}
      />

      <FlatList
        data={favorites}
        renderItem={renderFavoriteCard}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{
          padding: SIZES.medium,
          paddingBottom: 40,
        }}
        ListHeaderComponent={() =>
          favorites.length > 0 ? (
            <View style={styles.listHeader}>
              <Text style={styles.counterText}>
                {favorites.length} saved position{favorites.length === 1 ? "" : "s"}
              </Text>
              <Text style={styles.offlineBadge}>💾 Stored on device</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBox}>
              <Image
                source={icons.heartOutline}
                style={styles.emptyIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.emptyTitle}>No Saved Jobs Yet</Text>
            <Text style={styles.emptySubtitle}>
              Jobs you bookmark while exploring will be saved here so you can review
              and apply anytime, even offline.
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => router.push("/")}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreBtnText}>Explore Jobs 🚀</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  counterText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  offlineBadge: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SIZES.medium,
    marginBottom: SIZES.small + 2,
    ...SHADOWS.small,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 46,
    height: 46,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "80%",
    height: "80%",
  },
  initialsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.accentLight,
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.bold,
    color: COLORS.accent,
  },
  infoContainer: {
    flex: 1,
    marginLeft: SIZES.small + 4,
    marginRight: SIZES.small,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  companyName: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    flex: 1,
  },
  timeText: {
    fontSize: SIZES.xSmall,
    fontFamily: FONT.medium,
    color: COLORS.gray2,
    marginLeft: 6,
  },
  jobTitle: {
    fontSize: SIZES.medium - 1,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 6,
  },
  locationIcon: {
    width: 12,
    height: 12,
    tintColor: COLORS.gray,
    marginRight: 4,
  },
  locationText: {
    fontSize: SIZES.small - 1,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    flexShrink: 1,
  },
  pillsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  salaryPill: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  salaryPillText: {
    fontSize: SIZES.xSmall,
    fontFamily: FONT.bold,
    color: COLORS.success,
  },
  sourcePill: (source) => ({
    backgroundColor: source === "Remotive" ? "#EFF6FF" : "#F5F3FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  }),
  sourcePillText: (source) => ({
    fontSize: SIZES.xSmall,
    fontFamily: FONT.bold,
    color: source === "Remotive" ? "#1D4ED8" : "#6D28D9",
  }),
  removeBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFF1EE",
    borderWidth: 1,
    borderColor: "#FECDD3",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  removeBtnIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.tertiary,
  },
  clearHeaderBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
  },
  clearHeaderBtnText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.tertiary,
  },
  emptyContainer: {
    paddingVertical: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.large,
  },
  emptyIconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.medium,
    ...SHADOWS.small,
  },
  emptyIcon: {
    width: 32,
    height: 32,
    tintColor: COLORS.gray2,
  },
  emptyTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: SIZES.xLarge,
    maxWidth: 280,
  },
  exploreBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    ...SHADOWS.small,
  },
  exploreBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});

export default FavoritesScreen;
