import { StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 42,
    height: 42,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: 8,
  }),
});

export default styles;
