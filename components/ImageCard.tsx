import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface IImageCardProps {
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
}

const ImageCard: FC<IImageCardProps> = ({ image }) => {
  return <View>
    <Text>ImageCard</Text>
  </View>;
};

const styles = StyleSheet.create({
  title: {},
});

export default ImageCard;
