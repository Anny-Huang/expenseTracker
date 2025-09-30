import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';

// import InsightsChart from "@/components/InsightsChart";
// import { insights } from "@/mock";

export default function InsightScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Insights</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
});
