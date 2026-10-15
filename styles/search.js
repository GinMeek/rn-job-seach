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
  footerContainer: {
    marginTop: SIZES.large,
    marginBottom: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  paginationButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    ...SHADOWS.small,
  },
  paginationButtonDisabled: {
    backgroundColor: "#E2E8F0",
    shadowOpacity: 0,
    elevation: 0,
  },
  paginationButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small + 1,
    color: COLORS.white,
  },
  paginationButtonTextDisabled: {
    color: COLORS.gray2,
  },
  paginationTextBox: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paginationText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small + 2,
    color: COLORS.primary,
  },
});

export default styles;
