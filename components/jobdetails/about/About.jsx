import React from "react";
import { View, Text } from "react-native";

import styles from "./about.style";
import { stripHtml } from "../../../utils";

const About = ({ info }) => {
  const cleanDescription = typeof info === "string" ? stripHtml(info) : "No description provided.";

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About the role:</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{cleanDescription}</Text>
      </View>
    </View>
  );
};

export default About;
