import { data } from "@/constants/data";
import { wp } from "@/helpers/common";
import { FC } from "react";
import { FlatList, StyleSheet } from "react-native";
import CategoryItem from "./CategoryItem";

interface ICategoryProps {
  activeCategory: string | null;
  handleChangeActive: (value: string | null) => void;
}

const Categories: FC<ICategoryProps> = ({
  activeCategory,
  handleChangeActive,
}) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatListContainer}
      showsHorizontalScrollIndicator
      data={data.categories}
      keyExtractor={(item: string) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          isActive={activeCategory === item}
          handleChangeActive={handleChangeActive}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
});

export default Categories;
