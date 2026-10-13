import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: SIZES.small,
  },
  titleRow: {
    marginBottom: SIZES.small,
  },
  searchTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
  noOfSearchedJobs: {
    marginTop: 4,
    fontFamily: FONT.regular,
    fontSize: SIZES.small + 1,
    color: COLORS.gray,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: SIZES.small,
    marginBottom: SIZES.small,
  },
  sourceBtn: (isActive) => ({
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: isActive ? COLORS.primary : COLORS.white,
    borderWidth: 1,
    borderColor: isActive ? COLORS.primary : COLORS.border,
  }),
  sourceBtnText: (isActive) => ({
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: isActive ? COLORS.white : COLORS.gray,
  }),
  loaderContainer: {
    marginVertical: SIZES.large,
    alignItems: "center",
  },
  errorContainer: {
    marginVertical: SIZES.medium,
    alignItems: "center",
  },
  errorText: {
    color: COLORS.tertiary,
    fontFamily: FONT.regular,
    fontSize: SIZES.small + 2,
    marginBottom: 8,
  },
  retryBtn: {
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  retryBtnText: {
    color: COLORS.accent,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.large,
  },
  emptyTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium + 1,
    color: COLORS.primary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small + 1,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default styles;
