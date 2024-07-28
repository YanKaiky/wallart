import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FC, MutableRefObject, useMemo } from "react";
import { StyleSheet, Text } from "react-native";

interface IFiltersModalProps {
  modalRef: MutableRefObject<any>;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default FiltersModal;
