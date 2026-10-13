import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.medium,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  logoContainer: {
    width: 46,
    height: 46,
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
    fontSize: SIZES.small + 2,
    fontFamily: FONT.bold,
    color: COLORS.accent,
  },
  textContainer: {
    flex: 1,
    marginLeft: SIZES.medium,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  companyName: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    flex: 1,
  },
  timeText: {
    fontSize: SIZES.xSmall,
    fontFamily: FONT.medium,
    color: COLORS.gray2,
    marginLeft: 6,
  },
  jobName: {
    fontSize: SIZES.medium - 1,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 6,
  },
  locationIcon: {
    width: 12,
    height: 12,
    tintColor: COLORS.gray,
    marginRight: 4,
  },
  locationText: {
    fontSize: SIZES.small - 1,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    flexShrink: 1,
  },
  pillContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  typePill: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typePillText: {
    fontSize: SIZES.xSmall,
    fontFamily: FONT.medium,
    color: COLORS.gray,
    textTransform: "capitalize",
  },
  sourcePill: (source) => ({
    backgroundColor: source === "Remotive" ? "#EFF6FF" : "#F5F3FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  }),
  sourcePillText: (source) => ({
    fontSize: SIZES.xSmall,
    fontFamily: FONT.bold,
    color: source === "Remotive" ? "#1D4ED8" : "#6D28D9",
  }),
});

export default styles;
