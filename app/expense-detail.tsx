import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, useColorScheme } from "react-native";

// import ItemRow from "@/components/ItemRow";
// import { mockAiOutput } from "@/mock";

export default function ExpenseDetailModal() {
  const router = useRouter();
  const params = useLocalSearchParams<{ merchant?: string; date?: string; total?: string }>();
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const C = Colors[scheme];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Detail Modal</Text>
      <Text>{params.merchant}</Text>
      <Text>{params.date}</Text>
      <Text>{params.total}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: C.primary, opacity: pressed ? 0.9 : 1 },
        ]}
        onPress={() => router.back()}
      >
        <Text style={{ color: C.onPrimary, fontWeight: "600" }}>Close</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
