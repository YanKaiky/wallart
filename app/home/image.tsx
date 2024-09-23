import { theme } from "@/constants/theme";
import { wp } from "@/helpers/common";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Platform,
  StyleSheet,
  View,
} from "react-native";

const ImageScreen = () => {
  const router = useRouter();
  const item: any = useLocalSearchParams();

  const [status, setStatus] = useState("loading");

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;

    const width = Platform.OS === "web" ? wp(50) : wp(92);

    let height = width / aspectRatio;

    return { width, height };
  };

  const onLoad = () => setStatus("");

  return (
    <BlurView style={styles.container} tint="dark" intensity={60}>
      <View style={getSize()}>
        <View style={styles.loading}>
          {status === "loading" && (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>

        <Image
          transition={100}
          source={item.webformatURL}
          style={[styles.image, getSize()]}
          onLoad={onLoad}
        />
      </View>

      <Button title="Back" onPress={() => router.back()} />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderColor: "rgba(0,0,0,0.1)",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageScreen;
