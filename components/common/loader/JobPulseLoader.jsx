import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, images } from "../../../constants";

const JobPulseLoader = ({
  message = "Discovering fresh opportunities...",
  size = "medium",
  fullscreen = false,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.95,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  const logoDimension = size === "small" ? 40 : size === "large" ? 72 : 54;

  return (
    <View style={[styles.container, fullscreen && styles.fullscreenContainer]}>
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            width: logoDimension + 16,
            height: logoDimension + 16,
            borderRadius: (logoDimension + 16) / 2,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Image
          source={images.logo}
          style={{ width: logoDimension, height: logoDimension }}
          resizeMode="contain"
        />
      </Animated.View>

      {message ? <Text style={styles.messageText}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.large,
    alignItems: "center",
    justifyContent: "center",
  },
  fullscreenContainer: {
    flex: 1,
    minHeight: 250,
  },
  logoWrapper: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  messageText: {
    marginTop: SIZES.medium,
    fontFamily: FONT.medium,
    fontSize: SIZES.small + 1,
    color: COLORS.gray,
    textAlign: "center",
    maxWidth: 240,
    lineHeight: 18,
  },
});

export default JobPulseLoader;
