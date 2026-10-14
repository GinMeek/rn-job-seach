import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(width * 0.82, 340);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: COLORS.white,
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: SIZES.medium,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    ...SHADOWS.large,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SIZES.small,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: SIZES.small,
  },
  titleCol: {
    justifyContent: "center",
  },
  brandTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  brandSubtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small - 1,
    color: COLORS.gray,
    marginTop: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  scrollContent: {
    paddingVertical: SIZES.small,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small + 1,
    color: COLORS.gray2,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: SIZES.medium,
    marginBottom: SIZES.small,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
    backgroundColor: "transparent",
  },
  navItemActive: {
    backgroundColor: COLORS.accentLight,
  },
  navIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  navLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium - 1,
    color: COLORS.primary,
    flex: 1,
  },
  badgePill: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
    color: COLORS.accent,
  },
  navItemHighlight: {
    backgroundColor: "#FFF1EE",
    borderWidth: 1,
    borderColor: "#FECDD3",
    marginBottom: 8,
  },
  navLabelHighlight: {
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  badgePillHighlight: {
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeTextHighlight: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xSmall,
    color: COLORS.white,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: SIZES.small,
  },
  categoryChip: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryChipText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  statusCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SIZES.small + 2,
    marginVertical: SIZES.small / 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  statusLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: 8,
  },
  statusText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  statusBadge: {
    fontSize: SIZES.xSmall,
    fontFamily: FONT.bold,
    color: COLORS.success,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accent,
    paddingVertical: 11,
    borderRadius: 12,
    marginTop: SIZES.medium,
    gap: 8,
    ...SHADOWS.small,
  },
  actionBtnSecondary: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 8,
  },
  actionBtnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small + 2,
    color: COLORS.white,
  },
  actionBtnTextSecondary: {
    color: COLORS.primary,
  },
  footerText: {
    textAlign: "center",
    fontFamily: FONT.regular,
    fontSize: SIZES.xSmall,
    color: COLORS.gray2,
    marginTop: SIZES.large,
  },
});

export default styles;
