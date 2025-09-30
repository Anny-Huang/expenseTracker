// app/login.tsx
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  useColorScheme,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const C = Colors[scheme];

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  // surfaces
  const border = scheme === "dark" ? "#2B3440" : "#E5E7EB";
  const cardBg = scheme === "dark" ? "#1E293B" : C.card;
  const inputBg = scheme === "dark" ? "#111827" : "#FFFFFF";
  const placeholder = "#9CA3AF";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={{ flex: 1, padding: 24, gap: 16, justifyContent: "center" }}>
        {/* Brand */}
        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontSize: 28, fontWeight: "800" }}>BillBot</Text>
          <Text style={{ opacity: 0.7, marginTop: 6 }}>
            Track receipts. See insights. Stay in control.
          </Text>
        </View>

        {/* Auth Card */}
        <View
          style={{
            backgroundColor: cardBg,
            borderRadius: 14,
            padding: 16,
            gap: 16,
            borderWidth: 1,
            borderColor: border,
          }}
        >
          {/* Email */}
          <View bg="transparent" style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, color: C.text, opacity: 0.85 }}>
              Email
            </Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor={placeholder}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={{
                backgroundColor: inputBg,
                color: C.text,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 14,
                borderWidth: 1,
                borderColor: border,
              }}
            />
          </View>

          {/* Password */}
          <View bg="transparent" style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, color: C.text, opacity: 0.85 }}>
              Password
            </Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={placeholder}
              secureTextEntry
              value={pwd}
              onChangeText={setPwd}
              style={{
                backgroundColor: inputBg,
                color: C.text,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 14,
                borderWidth: 1,
                borderColor: border,
              }}
            />
          </View>

          {/* Primary CTA */}
          <Pressable
            onPress={() => router.replace("/(tabs)")}
            style={({ pressed }) => ({
              marginTop: 8,
              backgroundColor: C.primary,
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text style={{ color: C.onPrimary, fontWeight: "700" }}>Sign in</Text>
          </Pressable>

          {/* Secondary actions */}
          <View
            bg="transparent"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Text style={{ fontSize: 12, opacity: 0.8 }}>Forgot password?</Text>
            <Text style={{ fontSize: 12, color: C.accent, fontWeight: "600" }} onPress={() => router.push('/create-account')}>
              Create account
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={{ alignItems: "center", marginTop: 8 }}>
          <Text style={{ fontSize: 12, opacity: 0.7 }}>
            By continuing, you agree to our Terms & Privacy.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
