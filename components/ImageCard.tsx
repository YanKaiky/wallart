import { theme } from "@/constants/theme";
import { getImageSize, wp } from "@/helpers/common";
import { Image } from "expo-image";
import { Router, router } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";

export interface IImageCardProps {
  router: Router;
  image: {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    collections: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
  };
  columns: number;
  index: number;
}

const ImageCard: FC<IImageCardProps> = ({ image, columns, index }) => {
  const getImageHeight = () => {
    return { height: getImageSize(image.imageHeight, image.imageWidth) };
  };

  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/home/image", params: { ...image } })
      }
      style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}
    >
      <Image
        style={[styles.image, getImageHeight()]}
        transition={100}
        source={{ uri: image?.webformatURL }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});

export default ImageCard;
