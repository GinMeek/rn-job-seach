import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL, getCompanyInitials } from "../../../../utils";
import { icons } from "../../../../constants";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  const isSelected = selectedJob === item.job_id;
  const hasValidLogo = checkImageURL(item.employer_logo);

  return (
    <TouchableOpacity
      style={styles.container(isSelected)}
      onPress={() => handleCardPress(item)}
      activeOpacity={0.8}
    >
      {/* Top row: Logo + Relative time badge */}
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          {hasValidLogo ? (
            <Image
              source={{ uri: item.employer_logo }}
              resizeMode="contain"
              style={styles.logoImage}
            />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>
                {getCompanyInitials(item.employer_name)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.badgeColumn}>
          {item.job_posted_at_formatted && (
            <View style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>🕒 {item.job_posted_at_formatted}</Text>
            </View>
          )}
          {item.source && (
            <View style={styles.sourceBadge(item.source)}>
              <Text style={styles.sourceBadgeText(item.source)}>{item.source}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Middle: Company Name & Job Title */}
      <View style={styles.infoContainer}>
        <Text style={styles.companyName} numberOfLines={1}>
          {item.employer_name}
        </Text>
        <Text style={styles.jobName(isSelected)} numberOfLines={2}>
          {item.job_title}
        </Text>
      </View>

      {/* Bottom row: Location & Salary / Remote Tag */}
      <View style={styles.bottomRow}>
        <View style={styles.locationWrapper}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationIcon}
          />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.job_location || "Remote"}
          </Text>
        </View>

        {item.job_salary ? (
          <View style={styles.salaryBadge}>
            <Text style={styles.salaryText} numberOfLines={1}>
              {item.job_salary}
            </Text>
          </View>
        ) : item.is_remote ? (
          <View style={styles.remoteBadge}>
            <Text style={styles.remoteText}>Remote</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
