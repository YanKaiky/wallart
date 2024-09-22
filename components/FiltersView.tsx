import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ISectionViewProps {
  title: string;
  content: string;
}

export const SectionView: FC<ISectionViewProps> = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View>{content}</View>
    </View>
  );
};

export const CommomFilterRow = () => {
  return (
    <View>
      <Text>Order View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.neutral(0.8),
  },
});
