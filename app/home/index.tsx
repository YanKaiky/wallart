import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const paddingTop = top > 0 ? top + 10 : 30;

  return (
    <View style={[styles.container, { paddingTop }]}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
});

export default HomeScreen;
