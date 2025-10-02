import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { StyleSheet, useColorScheme } from "react-native";

type Props = { title: string; value: number; deltaText?: string };

function money(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function SummaryCard({ title, value, deltaText }: Props) {
  const theme = useColorScheme() ?? "light";
  const C = Colors[theme as "light" | "dark"];
  const isNegative = typeof deltaText === "string" && deltaText.trim().startsWith("-");

  return (
    <View style={[styles.card, { backgroundColor: C.primary, borderColor: C.primary }]}>
      <Text style={[styles.title, { color: C.onPrimary }]}>{title}</Text>
      <Text style={[styles.value, { color: C.onPrimary }]}>{money(value)}</Text>
      {deltaText ? (
        <Text style={[styles.delta, { color: C.onPrimary, opacity: 0.95 }]}>
          <Text style={{ color: isNegative ? C.error : C.success }}>{deltaText}</Text>
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, paddingVertical: 18, paddingHorizontal: 16 },
  title: { fontSize: 13, fontWeight: "600", marginBottom: 6 },
  value: { fontSize: 28, fontWeight: "800", letterSpacing: 0.2, marginBottom: 4 },
  delta: { fontSize: 12, fontWeight: "700" },
});
