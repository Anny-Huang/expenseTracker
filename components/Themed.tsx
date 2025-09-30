/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import Colors from "@/constants/Colors";
import { Text as DefaultText, View as DefaultView, useColorScheme } from "react-native";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

// NEW: allow choosing background source for Themed.View
type BgChoice = "background" | "card" | "transparent";

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps &
  DefaultView["props"] & {
    bg?: BgChoice; // default: "background"
  };

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];
  if (colorFromProps) return colorFromProps;
  return Colors[theme][colorName];
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, bg = "background", ...otherProps } = props;
  const theme = useColorScheme() ?? "light";

  // Decide base background
  let backgroundColor: string;
  if (bg === "transparent") {
    backgroundColor = "transparent";
  } else if (bg === "card") {
    backgroundColor = Colors[theme].card;
  } else {
    // default
    backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
  }

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
