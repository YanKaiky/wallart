import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { FC } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

interface ICategoryItemProps {
  title: string;
  index: number;
  isActive: boolean;
  handleChangeActive: (value: string | null) => void;
}

const CategoryItem: FC<ICategoryItemProps> = ({
  title,
  index,
  isActive,
  handleChangeActive,
}) => {
  const backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;
  const color = isActive ? theme.colors.white : theme.colors.neutral(0.8);

  return (
    <Animated.View
      key={index}
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        onPress={() => handleChangeActive(isActive ? null : title)}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
  },
});

export default CategoryItem;
