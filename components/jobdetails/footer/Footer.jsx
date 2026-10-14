import React from "react";
import { View, Text, TouchableOpacity, Image, Linking, Alert } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";
import { useFavorites } from "../../../context/FavoritesContext";

const Footer = ({ job, url }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isSaved = isFavorite(job?.job_id);

  const handleToggleFavorite = async () => {
    if (!job) return;
    await toggleFavorite(job);
  };

  const handleApply = async () => {
    const targetUrl = url || job?.job_apply_link;
    if (!targetUrl) {
      Alert.alert("Notice", "Application link is currently unavailable.");
      return;
    }

    try {
      const supported = await Linking.canOpenURL(targetUrl);
      if (supported) {
        await Linking.openURL(targetUrl);
      } else {
        await Linking.openURL(targetUrl);
      }
    } catch (err) {
      console.warn("Could not open URL:", err);
      Linking.openURL(targetUrl);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.likeBtn(isSaved)}
        onPress={handleToggleFavorite}
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
