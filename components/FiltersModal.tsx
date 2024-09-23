import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FC, MutableRefObject, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { data } from "@/constants/data";
import {
  ColorFilter,
  CommomFilterRow,
  IFiltersProps,
  SectionView,
} from "./FiltersView";
import { capitalize } from "lodash";

interface IFiltersModalProps {
  modalRef: MutableRefObject<any>;
  filters: IFiltersProps | null;
  setFilters: (value: IFiltersProps) => void;
  onClose: (value: any) => void;
  onApply: (value: any) => void;
  onReset: (value: any) => void;
}

interface ICustombackdropModalProps {
  animatedIndex: any;
  style?: any;
}

const FiltersModal: FC<IFiltersModalProps> = ({
  modalRef,
  filters,
  setFilters,
  onClose,
  onApply,
  onReset,
}) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((name, i) => {
            const sectionView = sections[name];
            const sectionData = data.filters[name];
            const title = capitalize(name);

            return (
              <Animated.View
                entering={FadeInDown.delay(i * 100 + 100)
                  .springify()
                  .damping(11)}
                key={name}
              >
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: name,
                  })}
                />
              </Animated.View>
            );
          })}

          <Animated.View
            entering={FadeInDown.delay(500).springify().damping(11)}
            style={styles.buttons}
          >
            <Pressable style={styles.resetButton} onPress={onReset}>
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.neutral(0.9) },
                ]}
              >
                Reset
              </Text>
            </Pressable>

            <Pressable style={styles.applyButton} onPress={onApply}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Apply
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections: any = {
  order: (props: any) => <CommomFilterRow {...props} />,
  orientation: (props: any) => <CommomFilterRow {...props} />,
  type: (props: any) => <CommomFilterRow {...props} />,
  colors: (props: any) => <ColorFilter {...props} />,
};

const CustomBackdrop: FC<ICustombackdropModalProps> = ({
  animatedIndex,
  style,
}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.03),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: theme.colors.grayBG,
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  buttonText: {
    fontSize: hp(2.2),
  },
});

export default FiltersModal;
