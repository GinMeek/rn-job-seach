import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  userName: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.accent,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge - 4,
    color: COLORS.primary,
    marginTop: 2,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small + 1,
    color: COLORS.gray,
    marginTop: 4,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 52,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.card,
    marginRight: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: "100%",
    paddingHorizontal: SIZES.medium,
    ...SHADOWS.small,
  },
  searchInput: {
    fontFamily: FONT.regular,
    flex: 1,
    height: "100%",
    fontSize: SIZES.medium - 1,
    color: COLORS.primary,
  },
  clearBtn: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  clearBtnText: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
  },
  searchBtn: {
    width: 52,
    height: 52,
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  searchBtnImage: {
    width: 22,
    height: 22,
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeCategory, item) => ({
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: activeCategory === item ? COLORS.primary : COLORS.card,
    borderWidth: 1,
    borderColor: activeCategory === item ? COLORS.primary : COLORS.border,
  }),
  tabText: (activeCategory, item) => ({
    fontFamily: FONT.medium,
    fontSize: SIZES.small + 1,
    color: activeCategory === item ? COLORS.white : COLORS.gray,
  }),
});

export default styles;
