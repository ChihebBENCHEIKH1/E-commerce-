const mediaQ = (size: number): string =>
  `@media only screen and (min-width: ${size}px)`;

export const colors = {
  primary: "#2A8CCA",
  primaryWhite: "#fff",
  primaryGray: "#E9EBEE",
  lightGray: "#fafafb",
  borderGray: "#BDC7D8",
  antdBorder: "#E8E8E8",
  secondaryColor: "#242C38",
  semiTransparentBlack: "rgba(0,0,0,.25)",
  contentShadow:
    "0 0.3rem 1.2rem rgba(0, 0, 0, 0.19), 0 0.4rem 0.4rem rgba(0, 0, 0, 0.23)",
  antdErrorText: "#f5222d",
  antdSelection: "#f0fcff",
  disabled: "#c5c5c5",
  default: "default",
  red: "#ca3a2a",
  green: "#2aca67",
  yellow: "#cab22a",
};

export const fontSizes = {
  extraSmall: "0.6rem",
  small: "1rem",
  medium: "1.2rem",
  large: "1.4rem",
  extraLarge: "1.6rem",
};

export const fontWeights = {
  bold: 700,
  medium: 500,
};

export const iconSizes = {
  small: "0.7rem",
  medium: "1.2rem",
  large: "1.6rem",
  extraLarge: "3.6rem",
};

export const breakpointsValues = {
  small: 576,
  medium: 743,
  large: 920,
  desktop: 1200,
  extraLarge: 1460,
};

export const breakpoints = {
  small: mediaQ(breakpointsValues.small),
  medium: mediaQ(breakpointsValues.medium),
  large: mediaQ(breakpointsValues.large),
  desktop: mediaQ(breakpointsValues.desktop),
  extraLarge: mediaQ(breakpointsValues.extraLarge),
};

export const borders = {
  border: `1px solid ${colors.borderGray}`,
  radius: "5px",
  mediumRadius: "15px",
};

export const sizes = {
  formWidth: "1000px",
  pageHeader: "64px",
  pageHeaderSmall: "40px",
};
