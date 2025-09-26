// app/login.tsx
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "600", textAlign: "center" }}>
        ExpenseTracker Login
      </Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={pwd}
        onChangeText={setPwd}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      {/* 假登入：不驗證，直接進 Tabs */}
      <Button title="Login" onPress={() => router.replace("/(tabs)")} />
    </View>
  );
}
