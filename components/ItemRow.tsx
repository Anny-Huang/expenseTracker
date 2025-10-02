/**
 *  Didn't include horizontal padding because the spacing should be from
 *  outer container not on each row based on Figma
 *  - each row includes a bottom border as a divider
 */
import { Text, View, useThemeColor } from "@/components/Themed";
import React from "react";

type Props = {
  name: string;
  qty: number;
  price: number;
};

export default function ItemRow({
  name,
  qty,
  price,
}: //  isLast = false, -- only rows that are NOT the last one get a bottom border as divider
Props) {
  const text = useThemeColor({}, "text");
  const textMuted = useThemeColor({}, "textMuted");
  const border = useThemeColor({}, "border");
  const cardBg = useThemeColor({}, "card");

  const lineTotal = qty * price;

  return (
    <View
      style={{
        backgroundColor: cardBg,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: border,
        // borderBottomWidth: isLast ? 0 : 1,
        // borderBottomColor: border,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <View style={{ flex: 1, backgroundColor: cardBg }}>
        <Text style={{ color: text, fontSize: 16 }}>{name}</Text>
        <Text style={{ color: textMuted, fontSize: 12 }}>
          Qty {qty} × ${price.toFixed(2)}
        </Text>
      </View>

      <Text style={{ color: text, fontWeight: "600", fontSize: 16 }}>
        ${lineTotal.toFixed(2)}
      </Text>
    </View>
  );
}
