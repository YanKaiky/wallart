import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FC, MutableRefObject, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";

interface IFiltersModalProps {
  modalRef: MutableRefObject<any>;
}

interface ICustombackdropModalProps {
  animatedIndex: any;
  style?: any;
}

const FiltersModal: FC<IFiltersModalProps> = ({ modalRef }) => {
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
          <Text style={styles.filterText}>Sections here</Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
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
    // flex: 1,
    // gap: 15,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
});

export default FiltersModal;
