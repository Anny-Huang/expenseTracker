// app/welcome.tsx
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    useColorScheme,
} from "react-native";

export default function Welcome() {
  const router = useRouter();
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const C = Colors[scheme];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 24 }}>
        {/* Logo / Icon */}
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: scheme === "dark" ? "#1F2937" : "#E5E7EB",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/*Image place holder */}
          </View>
        </View>

        {/* Welcome Text */}
        <View style={{ alignItems: "center", gap: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            Welcome to ExpenseTracker
          </Text>
          <Text
            style={{
              fontSize: 14,
              opacity: 0.7,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            Track expenses smarter with AI-powered insights and automated
            receipt scanning
          </Text>
        </View>

        {/* Buttons */}
        <View style={{ gap: 12 }}>
          <Pressable
            onPress={() => router.replace("/login")}
            style={({ pressed }) => ({
              backgroundColor: C.primary,
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text style={{ color: C.onPrimary, fontWeight: "700" }}>
              Sign in
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/create-account")}
            style={({ pressed }) => ({
              borderWidth: 1,
              borderColor: C.primary,
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ color: C.primary, fontWeight: "700" }}>
              Create Account
            </Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#D1D5DB" }} />
          <Text style={{ marginHorizontal: 12, fontSize: 12, opacity: 0.6 }}>
            or continue with
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#D1D5DB" }} />
        </View>

        {/* Social Login Buttons */}
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 12 }}
        >
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "#D1D5DB",
              borderRadius: 12,
              width: 56,
              height: 56,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/*Image place holder */}
          </Pressable>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "#D1D5DB",
              borderRadius: 12,
              width: 56,
              height: 56,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/*Image place holder */}
          </Pressable>
        </View>

        {/* Footer */}
        <View style={{ alignItems: "center", marginTop: 12 }}>
          <Text style={{ fontSize: 12, opacity: 0.7, textAlign: "center" }}>
            By continuing, you agree to our{" "}
            <Text style={{ color: C.accent }}>Terms of Service</Text> and{" "}
            <Text style={{ color: C.accent }}>Policy</Text>.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
