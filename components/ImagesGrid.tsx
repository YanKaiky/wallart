import { MasonryFlashList } from "@shopify/flash-list";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import ImageCard from "./ImageCard";
import { getColumnsCount, wp } from "@/helpers/common";
import { Router } from "expo-router";

interface IImagesGridProps {
  images: object[];
  router: Router;
}

interface IRenderItem {
  item: any;
  index: number;
}

const ImagesGrid: FC<IImagesGridProps> = ({ images, router }) => {
  const columns = getColumnsCount();

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }: IRenderItem) => (
          <ImageCard router={router} image={item} columns={columns} index={index} />
        )}
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
  listContainer: {
    paddingHorizontal: wp(4),
  },
});

export default ImagesGrid;
