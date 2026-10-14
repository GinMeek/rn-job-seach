import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, images } from "../../../constants";

const AboutModal = ({ visible, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.cardContainer}>
              <View style={styles.logoWrapper}>
                <Image
                  source={images.logo}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.appTitle}>JobPulse</Text>
              <View style={styles.versionBadge}>
                <Text style={styles.versionText}>Version 1.0.0 • Expo 51</Text>
              </View>

              <Text style={styles.description}>
                JobPulse is a modern, cross-platform job discovery app powered by
                100% free open APIs from Remotive and Arbeitnow.
              </Text>

              <View style={styles.featuresBox}>
                <Text style={styles.featureItem}>
                  ✨ <Text style={styles.boldText}>Zero API Keys</Text>: Completely open feeds
                </Text>
                <Text style={styles.featureItem}>
                  🕒 <Text style={styles.boldText}>Real-time Timestamps</Text>: Relative dates
                </Text>
                <Text style={styles.featureItem}>
                  💼 <Text style={styles.boldText}>Global Reach</Text>: Tech, design & remote
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.closeButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
  },
  cardContainer: {
    width: "88%",
    maxWidth: 380,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: SIZES.large,
    alignItems: "center",
    ...SHADOWS.large,
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.small,
    overflow: "hidden",
    ...SHADOWS.small,
  },
  logoImage: {
    width: "80%",
    height: "80%",
  },
  appTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
  versionBadge: {
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: SIZES.small,
  },
  versionText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small - 1,
    color: COLORS.accent,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: SIZES.medium,
  },
  featuresBox: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: SIZES.medium,
    gap: 8,
    marginBottom: SIZES.large,
  },
  featureItem: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small + 1,
    color: COLORS.primary,
  },
  boldText: {
    fontFamily: FONT.bold,
  },
  closeButton: {
    width: "100%",
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.small,
  },
  closeButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});

export default AboutModal;
