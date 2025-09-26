import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function ProfileScreen() {
  const scheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const C = scheme === 'dark'
    ? { bg:'#151718', text:'#ECEDEE', muted:'#9BA1A6', card:'#1F2937', tint:'#fff' }
    : { bg:'#FFFFFF', text:'#11181C', muted:'#6B7280', card:'#F3F4F6', tint:'#0a7ea4' };

  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}>
      <View style={[styles.card, { backgroundColor: C.card }]}>
        <View style={[styles.avatar, { backgroundColor: C.tint }]} />
        <View style={{ flex:1 }}>
          <Text style={[styles.name, { color: C.text }]}>Annie Huang</Text>
          <Text style={{ color: C.muted, fontSize: 12 }}>annie@sait.ca</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: C.card }]}>
        <Text style={[styles.sectionTitle, { color: C.text }]}>Settings</Text>
        <Text style={{ color: C.muted, marginTop: 6 }}>Currency: CAD</Text>
        <Text style={{ color: C.muted, marginTop: 4 }}>Backup: Off</Text>
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: C.tint }]} onPress={() => router.replace('/login')}>
        <Text style={{ fontWeight:'700' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16, gap:12 },
  card:{ borderRadius:16, padding:12, flexDirection:'row', alignItems:'center', gap:12 },
  avatar:{ width:56, height:56, borderRadius:16 },
  name:{ fontSize:16, fontWeight:'700' },
  sectionTitle:{ fontSize:14, fontWeight:'700' },
  btn:{ marginTop:'auto', paddingVertical:12, borderRadius:10, alignItems:'center' },
});
