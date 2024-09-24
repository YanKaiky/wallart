import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { Entypo, Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const ImageScreen = () => {
  const router = useRouter();
  const item: any = useLocalSearchParams();

  const [status, setStatus] = useState("loading");

  const fileName = item?.previewURL?.split("/").pop();
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;

    const width = Platform.OS === "web" ? wp(50) : wp(92);

    let height = width / aspectRatio;

    return { width, height };
  };

  const onLoad = () => setStatus("");

  const handleShareImage = async () => {
    setStatus("sharing");

    const uri = await downloadFile();

    if (uri) await Sharing.shareAsync(uri);
  };

  const handleDownloadImage = async () => {
    setStatus("downloading");

    const uri = await downloadFile();

    if (uri) console.log("Image downloaded");
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        item.webformatURL,
        filePath
      );

      setStatus("");

      console.log(`'Downloaded at ${uri}`);

      return uri;
    } catch (error: any) {
      console.error(`Got error: ${error}`);

      setStatus("");

      Alert.alert("Image", error.message);

      return null;
    }
  };

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
          source={item?.webformatURL}
          style={[styles.image, getSize()]}
          onLoad={onLoad}
        />
      </View>

      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Octicons name="x" size={24} color="white" />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status === "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleDownloadImage}>
              <Octicons name="download" size={24} color="white" />
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status === "sharing" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleShareImage}>
              <Entypo name="share" size={22} color="white" />
            </Pressable>
          )}
        </Animated.View>
      </View>
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
  buttons: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
});

export default ImageScreen;
