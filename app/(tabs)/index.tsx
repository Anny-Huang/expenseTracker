import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, useColorScheme } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const C = Colors[scheme];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="Logout" onPress={() => router.replace('/login')} color={C.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
