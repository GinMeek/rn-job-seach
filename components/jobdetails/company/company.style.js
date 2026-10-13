import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoBox: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    ...SHADOWS.small,
  },
  logoImage: {
    width: "85%",
    height: "85%",
  },
  initialsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.accentLight,
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    color: COLORS.accent,
  },
  jobTitleBox: {
    marginTop: SIZES.small,
    paddingHorizontal: SIZES.small,
  },
  jobTitle: {
    fontSize: SIZES.xLarge - 2,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    textAlign: "center",
    lineHeight: 28,
  },
  companyInfoBox: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  companyName: {
    fontSize: SIZES.medium - 1,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
  divider: {
    color: COLORS.gray2,
    fontSize: SIZES.small,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationImage: {
    width: 14,
    height: 14,
    tintColor: COLORS.gray,
    marginRight: 2,
  },
  locationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },
  timeContainer: {
    marginTop: 8,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  timeText: {
    fontSize: SIZES.xSmall + 1,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  tagPill: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagPillText: {
    fontSize: SIZES.xSmall + 1,
    fontFamily: FONT.medium,
    color: COLORS.gray,
    textTransform: "capitalize",
  },
  salaryPill: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  salaryPillText: {
    fontSize: SIZES.xSmall + 1,
    fontFamily: FONT.bold,
    color: COLORS.success,
  },
  remotePill: {
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  remotePillText: {
    fontSize: SIZES.xSmall + 1,
    fontFamily: FONT.bold,
    color: COLORS.accent,
  },
  sourcePill: (source) => ({
    backgroundColor: source === "Remotive" ? "#EFF6FF" : "#F5F3FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: source === "Remotive" ? "#BFDBFE" : "#DDD6FE",
  }),
  sourcePillText: (source) => ({
    fontSize: SIZES.xSmall + 1,
    fontFamily: FONT.bold,
    color: source === "Remotive" ? "#1D4ED8" : "#6D28D9",
  }),
});

export default styles;
