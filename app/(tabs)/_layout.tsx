import Colors from "@/constants/Colors";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable, useColorScheme } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function FeatherIcon({
  name,
  color,
  size = 22,
}: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size?: number;
}) {
  return <Feather name={name} size={size} color={color} style={{ marginBottom: -2 }} />;
}

export default function TabLayout() {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const palette = Colors?.[scheme] ?? Colors.light;

  const active = palette?.tint ?? "#2f6fed";
  const inactive = palette?.tabIconDefault ?? "#9CA3AF";
  const headerText = palette?.text ?? (scheme === "dark" ? "#fff" : "#111");

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: inactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarStyle: { height: 60 },
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FeatherIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable accessibilityRole="button" accessibilityLabel="Open info" hitSlop={10}>
                {({ pressed }) => (
                  <Feather
                    name="info"
                    size={20}
                    color={headerText}
                    style={{ marginRight: 16, opacity: pressed ? 0.6 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="capture"
        options={{
          title: "Capture",
          tabBarIcon: ({ color }) => <FeatherIcon name="camera" color={color} />,
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => <FeatherIcon name="bar-chart-2" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <FeatherIcon name="settings" color={color} />,
        }}
      />

      <Tabs.Screen
        name="test"
        options={{
          title: "Test",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="flask" size={22} color={color} style={{ marginBottom: -2 }} />
          ),
        }}
      />
    </Tabs>
  );
}
