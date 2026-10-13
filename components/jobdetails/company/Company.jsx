import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
import { checkImageURL, getCompanyInitials } from "../../../utils";

const Company = ({
  companyLogo,
  jobTitle,
  companyName,
  location,
  postedTime,
  salary,
  isRemote,
  source,
  employmentType,
}) => {
  const hasValidLogo = checkImageURL(companyLogo);

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        {hasValidLogo ? (
          <Image
            source={{ uri: companyLogo }}
            style={styles.logoImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>
              {getCompanyInitials(companyName)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName}</Text>
        <Text style={styles.divider}>•</Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{location || "Remote"}</Text>
        </View>
      </View>

      {/* Datetime indicator */}
      {postedTime && (
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>🕒 Posted {postedTime}</Text>
        </View>
      )}

      {/* Pill tags */}
      <View style={styles.tagsContainer}>
        {employmentType && (
          <View style={styles.tagPill}>
            <Text style={styles.tagPillText}>{employmentType}</Text>
          </View>
        )}

        {salary && (
          <View style={styles.salaryPill}>
            <Text style={styles.salaryPillText}>{salary}</Text>
          </View>
        )}

        {isRemote && (
          <View style={styles.remotePill}>
            <Text style={styles.remotePillText}>Remote</Text>
          </View>
        )}

        {source && (
          <View style={styles.sourcePill(source)}>
            <Text style={styles.sourcePillText(source)}>{source}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Company;
