import PrimaryButton from "@/components/PrimaryButton";
import { Text, View, useThemeColor } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React, { memo, useMemo, useState } from "react";
import {
    Image,
    ImageErrorEventData,
    NativeSyntheticEvent,
    View as RNView,
    StyleSheet,
    useColorScheme,
} from "react-native";

type Props = {
  name: string;
  email: string;
  onEditPress?: () => void | Promise<void>;
  avatarUrl?: string;
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
};

function getInitials(name: string) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ProfileHeader({
  name,
  email,
  onEditPress,
  avatarUrl,
  loading = false,
  disabled = false,
  testID = "profile-header",
}: Props) {
  const text = useThemeColor({}, "text");
  const textMuted = useThemeColor({}, "textMuted");
  const card = useThemeColor({}, "card");
  const border = useThemeColor({}, "border");

  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const palette = Colors?.[scheme] ?? Colors.light;

  const avatarBg = palette?.info ?? "#D6E4FF";
  const avatarText = palette?.onPrimary ?? "#0F172A";

  const [imgOk, setImgOk] = useState<boolean>(!!avatarUrl);

  const a11yLabel = useMemo(
    () => `Profile header. ${name || "Unknown user"}. ${email || "No email"}.`,
    [name, email]
  );

  const onImgError = (_e: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImgOk(false);
  };

  return (
    <View
      bg="card"
      style={[styles.card, { borderColor: border, backgroundColor: card }]}
      accessibilityRole="summary"
      accessibilityLabel={a11yLabel}
      testID={testID}
    >
      {/* Left: Avatar */}
      <RNView style={styles.left}>
        <View
          bg="transparent"
          style={[styles.avatar, { backgroundColor: avatarBg }]}
          accessibilityRole="image"
          accessibilityLabel="User avatar"
        >
          {imgOk && avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              onError={onImgError}
              resizeMode="cover"
              style={styles.avatarImg}
            />
          ) : (
            <Text style={[styles.avatarInitials, { color: avatarText }]}>
              {getInitials(name)}
            </Text>
          )}
        </View>
      </RNView>

      {/* Middle: Name + Email */}
      <RNView style={styles.mid}>
        <Text
          numberOfLines={1}
          style={[styles.name, { color: text }]}
          accessibilityRole="text"
        >
          {name || "Unknown User"}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.email, { color: textMuted }]}
          accessibilityRole="text"
        >
          {email || "—"}
        </Text>
      </RNView>

      {/* Right: Edit Profile button (outlined) */}
      <RNView style={styles.right}>
        <PrimaryButton
          title="Edit Profile"
          variant="outline"
          size="md"
          onPress={onEditPress}
          loading={loading}
          disabled={disabled}
          testID="btn-edit-profile"
          accessibilityLabel="Edit profile"
          contentStyle={{ minWidth: 0, paddingHorizontal: 12 }}
        />
      </RNView>
    </View>
  );
}

const AVATAR_SIZE = 56;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  left: { width: AVATAR_SIZE, height: AVATAR_SIZE },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
  },
  avatarInitials: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  mid: { flex: 1, rowGap: 2 },
  name: { fontSize: 16, fontWeight: "800" },
  email: { fontSize: 13, fontWeight: "600" },
  right: { marginLeft: 8 },
});

export default memo(ProfileHeader);
