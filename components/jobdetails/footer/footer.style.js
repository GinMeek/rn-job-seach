import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    ...SHADOWS.large,
  },
  likeBtn: (isSaved) => ({
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: isSaved ? COLORS.tertiary : COLORS.border,
    backgroundColor: isSaved ? "#FFF1EE" : COLORS.white,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  }),
  likeBtnImage: (isSaved) => ({
    width: 24,
    height: 24,
    tintColor: isSaved ? COLORS.tertiary : COLORS.gray,
  }),
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.accent,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    borderRadius: 14,
    ...SHADOWS.small,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
});

export default styles;
