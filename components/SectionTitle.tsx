import { Text, View, useThemeColor } from "@/components/Themed";
import React from "react";

type Props = { title: string };

export default function SectionTitle({ title }: Props) {
  const titleColor = useThemeColor({}, "text");

  return (
    <View>
      <Text
        style={{
          color: titleColor,
          fontSize: 16,
          fontWeight: "500"
        }}
      >
        {title}
      </Text>
      <View style={{ height: 24 }} />
    </View>
  );
}
