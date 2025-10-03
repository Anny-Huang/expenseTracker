import { Text, View, useThemeColor } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { Platform, Pressable, View as RNView, StyleSheet } from "react-native";

type Props = {
  /** Tap anywhere on the dashed box to trigger gallery (optional). */
  onPickFromGallery?: () => void | Promise<void>;
  /** Long-press / secondary action (optional) for opening camera. */
  onOpenCamera?: () => void | Promise<void>;
  /** Called when a file is dropped on Web. */
  onDropFiles?: (files: FileList) => void;
  height?: number;
  helperText?: string;
  testID?: string;
};

function ReceiptCapture({
  onPickFromGallery,
  onOpenCamera,
  onDropFiles,
  height = 280,
  helperText = "Or drag and drop image files",
  testID,
}: Props) {
  const border = useThemeColor({}, "border");
  const text = useThemeColor({}, "text");
  const textMuted = useThemeColor({}, "textMuted");
  const card = useThemeColor({}, "card");

  const [dragOver, setDragOver] = useState(false);
  const isWeb = Platform.OS === "web";
  const dropRef = useRef<RNView>(null);

  const borderStyle = useMemo(
    () => [
      styles.dashedBox,
      {
        minHeight: height,
        borderColor: border,
        backgroundColor: card,
        opacity: dragOver ? 0.96 : 1,
      },
    ],
    [border, card, dragOver, height]
  );

  const handlePress = useCallback(() => {
    if (onPickFromGallery) onPickFromGallery();
  }, [onPickFromGallery]);

  const handleLongPress = useCallback(() => {
    if (onOpenCamera) onOpenCamera();
  }, [onOpenCamera]);

  const handleDragOver = useCallback((e: any) => {
    if (!isWeb) return;
    e.preventDefault?.();
    setDragOver(true);
  }, [isWeb]);

  const handleDragLeave = useCallback((e: any) => {
    if (!isWeb) return;
    e.preventDefault?.();
    setDragOver(false);
  }, [isWeb]);

  const handleDrop = useCallback((e: any) => {
    if (!isWeb) return;
    e.preventDefault?.();
    setDragOver(false);
    try {
      const files: FileList | undefined = e?.dataTransfer?.files;
      if (files && files.length > 0) {
        onDropFiles?.(files);
      }
    } catch (err) {
      console.error("Drop failed:", err);
    }
  }, [isWeb, onDropFiles]);

  return (
    <View
      bg="transparent"
      style={{ width: "100%" }}
      testID={testID ?? "receipt-capture"}
    >
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        accessibilityRole="button"
        accessibilityLabel="Tap to scan a receipt"
        hitSlop={10}
        style={({ pressed }) => [
          borderStyle,
          pressed ? { opacity: 0.95 } : null,
        ]}
        // RN Web drag & drop passthrough
        // @ts-ignore - web-only events are fine to pass through
        onDragOver={handleDragOver}
        // @ts-ignore
        onDragLeave={handleDragLeave}
        // @ts-ignore
        onDrop={handleDrop}
        ref={dropRef}
      >
        <RNView style={styles.center}>
          <FontAwesome
            name="camera"
            size={36}
            color={textMuted}
            style={{ marginBottom: 12 }}
          />
          <Text style={[styles.title, { color: text }]}>
            Tap to scan a receipt
          </Text>
          <Text style={[styles.helper, { color: textMuted }]}>
            {helperText}
          </Text>
        </RNView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dashedBox: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  helper: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default memo(ReceiptCapture);
