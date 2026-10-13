import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (isSelected) => ({
    width: 270,
    padding: SIZES.medium,
    backgroundColor: isSelected ? COLORS.primary : COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: isSelected ? COLORS.primary : COLORS.border,
    justifyContent: "space-between",
    ...SHADOWS.medium,
  }),
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  logoContainer: {
    width: 48,
    height: 48,
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
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.accent,
  },
  badgeColumn: {
    alignItems: "flex-end",
    gap: 4,
  },
  timeBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  timeBadgeText: {
    fontSize: SIZES.xSmall + 1,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  sourceBadge: (source) => ({
    backgroundColor: source === "Remotive" ? "#EFF6FF" : "#F5F3FF",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: source === "Remotive" ? "#BFDBFE" : "#DDD6FE",
  }),
  sourceBadgeText: (source) => ({
    fontSize: SIZES.xSmall,
    fontFamily: FONT.bold,
    color: source === "Remotive" ? "#1D4ED8" : "#6D28D9",
  }),
  infoContainer: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small,
  },
  companyName: {
    fontSize: SIZES.small + 1,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginBottom: 4,
  },
  jobName: (isSelected) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: isSelected ? COLORS.white : COLORS.primary,
    lineHeight: 22,
  }),
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 6,
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.gray,
    marginRight: 4,
  },
  locationText: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    flexShrink: 1,
  },
  salaryBadge: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  salaryText: {
    fontSize: SIZES.xSmall,
    fontFamily: FONT.bold,
    color: COLORS.success,
  },
  remoteBadge: {
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  remoteText: {
    fontSize: SIZES.xSmall,
    fontFamily: FONT.bold,
    color: COLORS.accent,
  },
});

export default styles;
