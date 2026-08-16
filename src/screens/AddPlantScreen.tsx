import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

import { useState } from "react";
import { usePlants } from "../context/PlantContext";

export default function AddPlantScreen({ navigation }: any) {

  const { addPlant } = usePlants();

  const [name, setName] = useState("");
  const [water, setWater] = useState("");
  const [light, setLight] = useState("");

  const handleSave = () => {
  addPlant({
    name,
    water,
    light,
  });

  alert("Plant saved 🌱");

  navigation.navigate("Home");
};


  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}
>

      <View style={styles.header}>
  <Text style={styles.title}>
    Add a Plant
  </Text>

  <Text style={styles.emoji}>
    🌿
  </Text>
</View>

<Text style={styles.subtitle}>
  Tell Rooted a little about your new plant.
</Text>


      <TextInput
  style={styles.input}
  placeholder="Plant name"
  placeholderTextColor="#888"
  value={name}
  onChangeText={setName}
/>

<TextInput
  style={styles.input}
  placeholder="Water schedule (e.g. Every 7 days)"
  placeholderTextColor="#888"
  value={water}
  onChangeText={setWater}
/>

<TextInput
  style={styles.input}
  placeholder="Light requirements (e.g. Bright indirect light)"
  placeholderTextColor="#888"
  value={light}
  onChangeText={setLight}
/>


      <Pressable
  style={styles.saveButton}
  onPress={handleSave}
>
  <Text style={styles.saveButtonText}>
    🌱 Save Plant
  </Text>
</Pressable>
   </ScrollView>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7f2",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#123F21",
  },

  emoji: {
    fontSize: 34,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 25,
    lineHeight: 21,
  },

  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E2E8DE",
  },

  saveButton: {
    backgroundColor: "#123F21",
    padding: 17,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
});