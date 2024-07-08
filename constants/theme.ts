interface IThemeProps {
  colors: {
    white: string;
    black: string;
    grayBG: string;
    neutral: (opcaticy: number) => string;
  };
  fontWeights: {
    medium: "500" | string | any;
    semibold: "600" | string | any;
    bold: "700" | string | any;
  };
  radius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export const theme: IThemeProps = {
  colors: {
    white: "#fff",
    black: "#000",
    grayBG: "#e5e5e5",
    neutral: (opcaticy: number) => `rgba(10, 10, 10, ${opcaticy})`,
  },
  fontWeights: {
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
};
