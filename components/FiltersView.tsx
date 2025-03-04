import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { capitalize, filter } from "lodash";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ISectionViewProps {
  title: string;
  content: string;
}

interface IFilterProps {
  data: any;
  filterName: "colors" | "order" | "orientation" | "type";
  filters: IFiltersProps | null;
  setFilters: (value: IFiltersProps | null) => void;
}

export interface IFiltersProps {
  [key: "colors" | "order" | "orientation" | "type" | string]: string;
}

export const SectionView: FC<ISectionViewProps> = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View>{content}</View>
    </View>
  );
};

export const CommomFilterRow: FC<IFilterProps> = ({
  data,
  filterName,
  filters,
  setFilters,
}) => {
  const onSelect = (item: string) => {
    setFilters({ ...filters, [filterName]: item });
  };

  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item: string, i: number) => {
          const isActive = filters && filters[filterName] === item;
          const backgroundColor = isActive
            ? theme.colors.neutral(0.7)
            : "white";
          const color = isActive ? "white" : theme.colors.neutral(0.7);

          return (
            <Pressable
              onPress={() => onSelect(item)}
              style={[styles.outlinedButton, { backgroundColor }]}
              key={i}
            >
              <Text style={[{ color }]}>{capitalize(item)}</Text>
            </Pressable>
          );
        })}
    </View>
  );
};

export const ColorFilter: FC<IFilterProps> = ({
  data,
  filterName,
  filters,
  setFilters,
}) => {
  const onSelect = (item: string) => {
    setFilters({ ...filters, [filterName]: item });
  };

  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item: string, i: number) => {
          const isActive = filters && filters[filterName] === item;
          const borderColor = isActive ? theme.colors.neutral(0.4) : "white";

          return (
            <Pressable onPress={() => onSelect(item)} key={i}>
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
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
  flexRowWrap: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  outlinedButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve: "continuous",
  },
  color: {
    height: 30,
    width: 40,
    borderRadius: theme.radius.sm - 3,
    borderCurve: "continuous",
    borderWidth: 0.5,
    borderColor: theme.colors.neutral(0.05),
  },
});
