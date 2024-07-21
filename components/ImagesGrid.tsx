import { MasonryFlashList } from "@shopify/flash-list";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import ImageCard from "./ImageCard";
import { wp } from "@/helpers/common";

interface IImagesGridProps {
  images: object[];
}

interface IRenderItem {
  item: any;
}

const ImagesGrid: FC<IImagesGridProps> = ({ images }) => {
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={2}
        renderItem={({ item }: IRenderItem) => <ImageCard image={item} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
});

export default ImagesGrid;
