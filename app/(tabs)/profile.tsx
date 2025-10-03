
import { Text, View, useThemeColor } from "@/components/Themed";
import Colors from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, View as RNView, ScrollView, StyleSheet, Switch } from "react-native";

import ProfileHeader from "@/components/ProfileHeader";
import SectionTitle from "@/components/SectionTitle";

export default function ProfileScreen() {
  const router = useRouter();
  const border = useThemeColor({}, "border");
  const text = useThemeColor({}, "text");
  const textMuted = useThemeColor({}, "textMuted");
  const card = useThemeColor({}, "card");


  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("CAD");
  const [language, setLanguage] = useState<string>("English");

  const onEditProfile = () => {
    // TODO: navigate to your real Edit Profile route/modal
    Alert.alert("Edit Profile", "Wire this to /profile/edit when ready.");
    // router.push("/profile/edit");
  };

  const Row = ({
    icon,
    title,
    subtitle,
    onPress,
    right,
    testID,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    right?: React.ReactNode;
    testID?: string;
  }) => (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: card, borderBottomColor: border, opacity: pressed ? 0.96 : 1 },
      ]}
      accessibilityRole={onPress ? "button" : "summary"}
      testID={testID}
    >
      <RNView style={styles.rowLeft}>
        {icon}
        <RNView style={{ gap: 2, flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "700", color: text }}>{title}</Text>
          {subtitle ? (
            <Text style={{ fontSize: 12, color: textMuted }} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </RNView>
      </RNView>

      <RNView style={styles.rowRight}>
        {right}
        {onPress ? <Feather name="chevron-right" size={18} color={textMuted} /> : null}
      </RNView>
    </Pressable>
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Settings</Text>

      {/* Profile header card */}
      <ProfileHeader
        name="Alex Doe"
        email="alex.doe@example.com"
        avatarUrl={undefined} 
        onEditPress={onEditProfile}
      />

      {/* Account */}
      <SectionTitle title="Account" />
      <View
        bg="card"
        style={{ borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: border }}
      >
        <Row
          icon={<Feather name="credit-card" size={18} color={text} style={styles.icon} />}
          title="Payment Methods"
          subtitle="Manage your cards"
          onPress={() => Alert.alert("Payment Methods", "Wire this to /payment-methods")}
          testID="row-payment"
        />
        <Row
          icon={<Feather name="bell" size={18} color={text} style={styles.icon} />}
          title="Notifications"
          subtitle="Email and push preferences"
          onPress={() => Alert.alert("Notifications", "Wire this to /notifications")}
          testID="row-notifications"
        />
        <Row
          icon={<Feather name="shield" size={18} color={text} style={styles.icon} />}
          title="Privacy & Security"
          subtitle="Password, sessions, devices"
          onPress={() => Alert.alert("Privacy & Security", "Wire this to /privacy")}
          testID="row-privacy"
        />
      </View>

      {/* Preferences */}
      <SectionTitle title="Preferences" />
      <View
        bg="card"
        style={{ borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: border }}
      >
        <Row
          icon={<Feather name="globe" size={18} color={text} style={styles.icon} />}
          title="Language"
          subtitle={language}
          onPress={() => {
            // TODO: open language picker
            setLanguage(language === "English" ? "French" : "English");
          }}
          testID="row-language"
        />
        <Row
          icon={<Feather name="dollar-sign" size={18} color={text} style={styles.icon} />}
          title="Currency"
          subtitle={currency}
          onPress={() => {
            // TODO: open currency picker
            setCurrency(currency === "CAD" ? "USD" : "CAD");
          }}
          testID="row-currency"
        />
        <Row
          icon={<Feather name="moon" size={18} color={text} style={styles.icon} />}
          title="Dark Mode"
          right={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor={darkMode ? Colors.dark.tint : undefined}
            />
          }
         
          testID="row-darkmode"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: { marginRight: 12 },
  row: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", flex: 1, columnGap: 8 },
  rowRight: { flexDirection: "row", alignItems: "center", columnGap: 8 },
});
