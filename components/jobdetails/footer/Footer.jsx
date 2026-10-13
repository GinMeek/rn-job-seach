import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking, Alert } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";

const Footer = ({ url }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleApply = async () => {
    if (!url) {
      Alert.alert("Notice", "Application link is currently unavailable.");
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(url);
      }
    } catch (err) {
      console.warn("Could not open URL:", err);
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.likeBtn(isSaved)}
        onPress={() => setIsSaved(!isSaved)}
        activeOpacity={0.7}
      >
        <Image
          source={isSaved ? icons.heart : icons.heartOutline}
          style={styles.likeBtnImage(isSaved)}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={handleApply}
        activeOpacity={0.8}
      >
        <Text style={styles.applyBtnText}>Apply Now 🚀</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
