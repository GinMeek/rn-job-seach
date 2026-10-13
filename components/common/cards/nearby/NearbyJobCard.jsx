import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL, getCompanyInitials } from "../../../../utils";
import { icons } from "../../../../constants";

const NearbyJobCard = ({ job, handleNavigate }) => {
  const hasValidLogo = checkImageURL(job.employer_logo);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
      activeOpacity={0.7}
    >
      <View style={styles.logoContainer}>
        {hasValidLogo ? (
          <Image
            source={{ uri: job.employer_logo }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        ) : (
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>
              {getCompanyInitials(job.employer_name)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.companyName} numberOfLines={1}>
            {job.employer_name}
          </Text>
          {job.job_posted_at_formatted && (
            <Text style={styles.timeText}>
              🕒 {job.job_posted_at_formatted}
            </Text>
          )}
        </View>

        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.locationWrapper}>
            <Image
              source={icons.location}
              style={styles.locationIcon}
              resizeMode="contain"
            />
            <Text style={styles.locationText} numberOfLines={1}>
              {job.job_location || "Remote"}
            </Text>
          </View>

          <View style={styles.pillContainer}>
            {job.job_employment_type && (
              <View style={styles.typePill}>
                <Text style={styles.typePillText}>{job.job_employment_type}</Text>
              </View>
            )}

            {job.source && (
              <View style={styles.sourcePill(job.source)}>
                <Text style={styles.sourcePillText(job.source)}>{job.source}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
