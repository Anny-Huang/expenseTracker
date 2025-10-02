import ItemRow from "@/components/ItemRow";
import SectionTitle from "@/components/SectionTitle";
import { Text, View } from "@/components/Themed";
import TransactionCard from "@/components/TransactionCard";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, useColorScheme } from "react-native";

import DetailRow from "@/components/dashboard/DetailRow";
import SummaryCard from "@/components/dashboard/SummaryCard";
import TransactionHeader from "@/components/dashboard/TransactionHeader";

export default function TestScreen() {
  const router = useRouter();
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const C = Colors[scheme];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sandbox (Component Testing)</Text>

      {/* ======================= */}
      {/* Person A Components */}
      {/* ======================= */}
      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>TransactionCard Test</Text>
        <TransactionCard merchant="Starbucks" date="2024-10-01" total={-13.0} category="Food & Drink" />
      </View>

      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>ItemRow Test</Text>
        <ItemRow name="Latte" qty={1} price={5.0} />
      </View>

      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>SectionTitle Test</Text>
        <SectionTitle title="Receipt Details" />
      </View>

      {/* ======================= */}
      {/* Person B Components */}
      {/* ======================= */}
      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>SummaryCard Test</Text>
        <SummaryCard title="Balance" value={5240.12} deltaText="+240 this month" />
      </View>

      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>TransactionHeader Test</Text>
        <TransactionHeader merchant="Whole Foods Market" date="2024-06-15" total={56.24} verified />
      </View>

      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>DetailRow Test</Text>
        <DetailRow label="Payment Method" value="Credit Card (****4521)" />
      </View>

      {/* ======================= */}
      {/* Person C Components */}
      {/* ======================= */}
      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>ReceiptCapture Test</Text>
        {/* <ReceiptCapture /> */}
      </View>

      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>PrimaryButton Test</Text>
        {/* <PrimaryButton label="Camera" onPress={() => console.log("Camera pressed")} /> */}
      </View>

      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>ProfileHeader Test</Text>
        {/* <ProfileHeader name="Alex Doe" email="alex@example.com" /> */}
      </View>

      {/* ======================= */}
      {/* Person D Components */}
      {/* ======================= */}
      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>TabSwitch Test</Text>
        {/* <TabSwitch tabs={["Monthly", "3M", "6M", "Year"]} selected="Monthly" /> */}
      </View>

      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>InsightsChart Test</Text>
        {/* <InsightsChart
            income={3200}
            expenses={1850}
            categories={[
              { name: "Groceries", value: 600 },
              { name: "Housing", value: 700 },
              { name: "Transport", value: 300 },
            ]}
          /> */}
      </View>

      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>CategoryBar Test</Text>
        {/* <CategoryBar name="Groceries" value={600} max={1000} /> */}
      </View>

      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>SettingRow Test</Text>
        {/* <SettingRow label="Language" valueRight="English" /> */}
      </View>

      {/* ======================= */}
      {/* Modal Navigation Test */}
      {/* ======================= */}
      <View style={[styles.box, { borderColor: C.border }]}>
        <Text style={styles.subtitle}>🔗 Modal Navigation</Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: C.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          onPress={() => router.push("/review-edit")}
        >
          <Text style={[styles.buttonText, { color: C.onPrimary }]}>
            Open Review & Edit Modal
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: C.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          onPress={() =>
            router.push({
              pathname: "/expense-detail",
              params: {
                merchant: "Starbucks",
                date: "2024-06-15",
                total: "13.0",
              },
            })
          }
        >
          <Text style={[styles.buttonText, { color: C.onPrimary }]}>
            Open Expense Detail Modal
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  title: { fontSize: 18, fontWeight: "700" },
  subtitle: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  box: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  buttonText: { fontWeight: "600" },
});
