import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { View as RNView, StyleSheet, useColorScheme } from "react-native";

type Props = { merchant: string; date: string; total: number; verified?: boolean };

function money(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function TransactionHeader({ merchant, date, total, verified }: Props) {
  const theme = useColorScheme() ?? "light";
  const C = Colors[theme as "light" | "dark"];
  const isNegative = total < 0;

  return (
    <View style={styles.wrap} bg="transparent">
      <Text style={styles.merchant}>{merchant}</Text>
      <Text style={[styles.sub, { color: C.textMuted }]}>{new Date(date).toLocaleString()}</Text>
      <RNView style={styles.row}>
        <Text style={[styles.total, { color: isNegative ? C.error : C.text }]}>{money(Math.abs(total))}</Text>
        {verified ? (
          <Text style={[styles.badge, { backgroundColor: C.info, color: C.onPrimary }]}>Verified</Text>
        ) : null}
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6, paddingVertical: 8 },
  merchant: { fontSize: 16, fontWeight: "700" },
  sub: { fontSize: 13 },
  row: { flexDirection: "row", alignItems: "center", columnGap: 8, marginTop: 6 },
  total: { fontSize: 22, fontWeight: "800", letterSpacing: 0.2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, overflow: "hidden", fontSize: 12, fontWeight: "700" },
});
