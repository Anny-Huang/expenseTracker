import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, useColorScheme } from "react-native";

// import ItemRow from "@/components/ItemRow";
// import { mockAiOutput } from "@/mock";

export default function ReviewEditModal() {
  const router = useRouter();
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const C = Colors[scheme];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review & Edit Modal</Text>

      {/* TODO: Render ItemRow list from mockAiOutput.items */}
      {/* {mockAiOutput.items.map((it, idx) => (
        <ItemRow key={idx} name={it.name} qty={it.qty} price={it.price} />
      ))} */}

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
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
