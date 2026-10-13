import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginBottom: SIZES.small,
  },
  btn: (name, activeTab) => ({
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: name === activeTab ? COLORS.primary : COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: name === activeTab ? COLORS.primary : COLORS.border,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: FONT.medium,
    fontSize: SIZES.small + 1,
    color: name === activeTab ? COLORS.white : COLORS.gray,
  }),
});

export default styles;
