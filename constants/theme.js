const COLORS = {
  primary: "#1E1B4B",
  secondary: "#4338CA",
  accent: "#4F46E5",
  accentLight: "#EEF2FF",
  tertiary: "#FF6B4A",
  tertiaryLight: "#FFF1EE",

  success: "#059669",
  successLight: "#ECFDF5",
  warning: "#D97706",
  warningLight: "#FFFBEB",

  gray: "#64748B",
  gray2: "#94A3B8",
  gray3: "#CBD5E1",

  border: "#E2E8F0",
  card: "#FFFFFF",
  white: "#FFFFFF",
  lightWhite: "#F8FAFC",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
