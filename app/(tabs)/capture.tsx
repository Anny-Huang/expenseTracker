import { Text, View, useThemeColor } from "@/components/Themed";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useMemo, useState } from "react";
import { Alert, Platform, View as RNView, ScrollView } from "react-native";

import PrimaryButton from "@/components/PrimaryButton";
import ReceiptCapture from "@/components/ReceiptCapture";
import TransactionCard from "@/components/TransactionCard";

type PickedImage = {
  uri: string;
  name?: string;
  mime?: string;
  size?: number;
};
type Source = "gallery" | "camera";

export default function CaptureScreen() {
  const border = useThemeColor({}, "border");
  const tint = useThemeColor({}, "tint");

  const [lastPicked, setLastPicked] = useState<PickedImage | null>(null);
  const [active, setActive] = useState<Source | null>(null); 

  const handlePickFromGallery = useCallback(async () => {
    try {
      setActive("gallery");
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission required", "Please allow access to your photos to continue.");
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.9,
      });
      if (result.canceled) return;

      const asset = result.assets[0];
      setLastPicked({
        uri: asset.uri,
        name: asset.fileName ?? undefined,
        mime: asset.mimeType ?? undefined,
        size: typeof asset.fileSize === "number" ? asset.fileSize : undefined,
      });

      // TODO: send asset.uri (or asset) to your OCR/upload pipeline
    } catch (err) {
      console.error(err);
      Alert.alert("Gallery error", "We couldn’t open your gallery. Please try again.");
    }
  }, []);

  const handleOpenCamera = useCallback(async () => {
    try {
      if (Platform.OS !== "web") {
        setActive("camera");
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission required", "Please allow camera access to continue.");
          return;
        }
      } else {
        setActive("gallery");
        return handlePickFromGallery();
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.9,
      });
      if (result.canceled) return;

      const asset = result.assets[0];
      setLastPicked({
        uri: asset.uri,
        name: asset.fileName ?? undefined,
        mime: asset.mimeType ?? undefined,
        size: typeof asset.fileSize === "number" ? asset.fileSize : undefined,
      });

      // TODO: send asset to your OCR/upload pipeline
    } catch (err) {
      console.error(err);
      Alert.alert("Camera error", "We couldn’t open your camera. Please try again.");
    }
  }, [handlePickFromGallery]);

  const handleDropFiles = useCallback((files: FileList) => {
    try {
      setActive("gallery"); 
      const f = files.item(0);
      if (!f) return;
      if (!f.type.startsWith("image/")) {
        Alert.alert("Unsupported file", "Please drop an image file (PNG, JPG, etc.).");
        return;
      }
      const virtualUri = URL.createObjectURL(f);
      setLastPicked({
        uri: virtualUri,
        name: f.name ?? undefined,
        mime: f.type ?? undefined,
        size: f.size,
      });
      // TODO: use File/Blob f for upload when on web
    } catch (err) {
      console.error(err);
      Alert.alert("Drop failed", "Could not process the dropped file.");
    }
  }, []);

  // Dummy data to match Figma “Recent Scans”
  const recent = useMemo(
    () => [
      { merchant: "Coffee Shop", date: "2025-10-03", total: -4.2, category: "Food & Drink" },
      { merchant: "Grocery Store", date: "2025-10-02", total: -56.24, category: "Food" },
      { merchant: "Electricity Bill", date: "2025-05-15", total: -92.1, category: "Utilities" },
    ],
    []
  );

  const galleryActive = active === "gallery";
  const cameraActive = active === "camera";

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "800" }}>Capture Expense</Text>

      {/* Dashed upload area */}
      <ReceiptCapture
        onPickFromGallery={handlePickFromGallery}
        onOpenCamera={handleOpenCamera}
        onDropFiles={handleDropFiles}
        height={320}
        testID="capture-dropzone"
      />

      {/* Buttons: Gallery & Camera */}
      <View
        style={{
          flexDirection: "row",
          columnGap: 12,
          alignItems: "center",
          width: "100%",
        }}
      >
        <PrimaryButton
          title="Gallery"
          variant={galleryActive ? "primary" : "outline"}
          onPress={handlePickFromGallery}
          leftIcon={
            <Feather
              name="image"
              size={18}
              color={galleryActive ? "#ffffff" : (tint as string)}
            />
          }
          style={{ flex: 1 }}
          contentStyle={{ paddingHorizontal: 0 }}
          testID="btn-gallery"
        />
        <PrimaryButton
          title="Camera"
          variant={cameraActive ? "primary" : "outline"}
          onPress={handleOpenCamera}
          leftIcon={
            <Feather
              name="camera"
              size={18}
              color={cameraActive ? "#ffffff" : (tint as string)}
            />
          }
          style={{ flex: 1 }}
          contentStyle={{ paddingHorizontal: 0 }}
          testID="btn-camera"
        />
      </View>

      {/* Recent Scans (dummy list) */}
      <Text style={{ fontSize: 14, fontWeight: "800", marginTop: 8 }}>Recent Scans</Text>

      <View
        bg="card"
        style={{
          borderRadius: 16,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: border,
          marginTop: 8,
        }}
      >
        {recent.map((r, i) => (
          <TransactionCard
            key={`${r.merchant}-${i}`}
            merchant={r.merchant}
            date={r.date}
            total={r.total}
            category={r.category}
          />
        ))}
        {lastPicked ? (
          <RNView style={{ padding: 12, borderTopWidth: 1, borderColor: border }}>
            <Text style={{ fontSize: 12, fontWeight: "700", marginBottom: 4 }}>Most Recent</Text>
            <Text numberOfLines={1} style={{ opacity: 0.7 }}>
              {lastPicked.name ?? lastPicked.uri}
            </Text>
          </RNView>
        ) : null}
      </View>
    </ScrollView>
  );
}
