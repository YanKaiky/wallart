import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FC, MutableRefObject, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface IFiltersModalProps {
  modalRef: MutableRefObject<any>;
}

interface ICustombackdropModalProps {
  animatedIndex: any;
  style: any;
}

const FiltersModal: FC<IFiltersModalProps> = ({ modalRef }) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.container}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const CustomBackdropModal: FC<ICustombackdropModalProps> = ({
  animatedIndex,
  style,
}) => {
  const containerStyle = [StyleSheet.absoluteFill, style, styles.overlay];

  return <View style={containerStyle}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default FiltersModal;
