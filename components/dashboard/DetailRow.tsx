import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { StyleSheet, useColorScheme } from "react-native";

type Props = { label: string; value: string };

export default function DetailRow({ label, value }: Props) {
  const theme = useColorScheme() ?? "light";
  const C = Colors[theme as "light" | "dark"];

  return (
    <View bg="transparent" style={[styles.row, { borderBottomColor: C.border }]}>
      <Text style={[styles.label, { color: C.textMuted }]}>{label}</Text>
      <Text style={[styles.value, { color: C.text }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  label: { fontSize: 14, fontWeight: "600" },
  value: { fontSize: 14, fontWeight: "700", maxWidth: "62%", textAlign: "right" },
});
