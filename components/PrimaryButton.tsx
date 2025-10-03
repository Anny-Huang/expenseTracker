import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React, { memo, ReactNode, useMemo } from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleSheet,
    TextStyle,
    useColorScheme,
    View,
    ViewStyle,
} from "react-native";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

export type PrimaryButtonProps = Omit<PressableProps, "onPress"> & {
  title: string;
  onPress?: (e: GestureResponderEvent) => void | Promise<void>;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  testID?: string;
  contentStyle?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
};

function getSafe<T>(obj: Record<string, any> | undefined, key: string, fallback: T): T {
  if (!obj) return fallback;
  const v = obj[key];
  return (typeof v === "string" || typeof v === "number") ? (v as unknown as T) : fallback;
}

function PrimaryButton(props: PrimaryButtonProps) {
  const {
    title,
    onPress,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    testID,
    contentStyle,
    textStyle,
    accessibilityLabel,
    style,
    ...rest
  } = props;

  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const palette = Colors?.[scheme] ?? Colors.light;

  // Safe color fallbacks so missing tokens never crash UI
  const C = {
    primary: getSafe(palette, "primary", "#2f6fed"),
    onPrimary: getSafe(palette, "onPrimary", "#ffffff"),
    border: getSafe(palette, "border", "#E5E7EB"),
    text: getSafe(palette, "text", scheme === "dark" ? "#ffffff" : "#111111"),
    card: getSafe(palette, "card", scheme === "dark" ? "#1f2937" : "#ffffff"),
    background: getSafe(palette, "background", scheme === "dark" ? "#111827" : "#ffffff"),
  };

  const { height, padX, textSize } = useMemo(() => {
    switch (size) {
      case "lg":
        return { height: 48, padX: 16, textSize: 16 };
      case "md":
      default:
        return { height: 44, padX: 14, textSize: 15 };
    }
  }, [size]);

  const isDisabled = disabled || loading;

  // Colors per variant
  const baseColors = useMemo(() => {
    switch (variant) {
      case "outline":
        return {
          bg: C.background,
          border: C.primary,
          text: C.primary,
          underlayOpacity: 0.9,
        };
      case "ghost":
        return {
          bg: "transparent",
          border: "transparent",
          text: C.primary,
          underlayOpacity: 0.85,
        };
      case "primary":
      default:
        return {
          bg: C.primary,
          border: C.primary,
          text: C.onPrimary,
          underlayOpacity: 0.92,
        };
    }
  }, [variant, C]);

  const disabledStyles = isDisabled
    ? variant === "primary"
      ? { bg: "#9CA3AF", border: "#9CA3AF", text: "#ffffff" }
      : { bg: C.background, border: "#D1D5DB", text: "#9CA3AF" }
    : null;

  const bgColor = disabledStyles?.bg ?? baseColors.bg;
  const borderColor = disabledStyles?.border ?? baseColors.border;
  const labelColor = disabledStyles?.text ?? baseColors.text;

  return (
    <Pressable
      testID={testID}
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      hitSlop={10}
      style={({ pressed }) => [
        styles.button,
        {
          height,
          paddingHorizontal: padX,
          backgroundColor: bgColor,
          borderColor,
          opacity: pressed ? baseColors.underlayOpacity : 1,
          width: fullWidth ? "100%" : undefined,
        },
        style as ViewStyle,
      ]}
      {...rest}
    >
      <View style={[styles.content, contentStyle]}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}

        <Text
          numberOfLines={1}
          style={[styles.label, { color: labelColor, fontSize: textSize }, textStyle]}
        >
          {title}
        </Text>

        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}

        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            size="small"
            color={variant === "primary" ? C.onPrimary : C.primary}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    minWidth: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 8,
  },
  label: {
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginLeft: 8,
  },
});

export default memo(PrimaryButton);
