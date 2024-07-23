import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const wp = (percentage: number) => {
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  return (percentage * height) / 100;
};

export const getColumnsCount = () => {
  if (width >= 1024) {
    // Desktop
    return 4;
  } else if (width >= 768) {
    // Tablet
    return 3;
  } else {
    // Phone
    return 2;
  }
};

export const getImageSize = (height: number, width: number) => {
  if (width > height) {
    // Landscape
    return 250;
  } else if (width < height) {
    // Portrait
    return 300;
  } else {
    // Square
    return 200;
  }
};
