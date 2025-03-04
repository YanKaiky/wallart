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
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast, { ToastConfig } from "react-native-toast-message";

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
    if (Platform.OS === "web") {
      showToast("Link Copied");
    } else {
      setStatus("sharing");

      const uri = await downloadFile();

      if (uri) await Sharing.shareAsync(uri);
    }
  };

  const handleDownloadImage = async () => {
    if (Platform.OS === "web") {
      const anchor = document.createElement("a");
      anchor.href = item?.webformatURL;
      anchor.download = fileName || "image";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      setStatus("downloading");

      const uri = await downloadFile();

      if (uri) showToast("Image downloaded");
    }
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        item.webformatURL,
        filePath
      );

      setStatus("");

      console.log(`Downloaded at ${uri}`);

      return uri;
    } catch (error: any) {
      console.error(`Got error: ${error}`);

      setStatus("");

      Alert.alert("Image", error.message);

      return null;
    }
  };

  const showToast = (message: string) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const toastConfig: ToastConfig = {
    success: ({ text1, props, ...rest }: any) => (
      <View style={styles.toast}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
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
      <Toast config={toastConfig} />
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
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.white,
  },
});

export default ImageScreen;
