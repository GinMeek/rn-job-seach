import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginTop: 2,
  },
  headerBtn: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.medium,
    color: COLORS.accent,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
    minHeight: 160,
  },
  centerContainer: {
    paddingVertical: SIZES.large,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small + 2,
    color: COLORS.tertiary,
    marginBottom: 8,
  },
  retryBtn: {
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  retryText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.accent,
  },
  emptyText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});

export default styles;
