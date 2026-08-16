import React, { useState } from "react";
import { usePlants } from "../context/PlantContext";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { searchPlants, getPlantDetails } from "../api/plantApi";

export default function PlantSearch({ navigation }: any) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { addPlant } = usePlants();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const plants = await searchPlants(query);

    setResults(plants);
    setLoading(false);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
  <View>
    <Text style={styles.title}>
      Find a Plant
    </Text>

    <Text style={styles.subtitle}>
      Search our plant library to add a new plant.
    </Text>
  </View>

  <Text style={styles.headerEmoji}>
    🔎
  </Text>
</View>

      <TextInput
  style={styles.input}
  placeholder="Search for a plant..."
  placeholderTextColor="#888"
  value={query}
  onChangeText={setQuery}
  onSubmitEditing={handleSearch}
  returnKeyType="search"
/>

      <Pressable
        style={styles.button}
        onPress={handleSearch}
      >
        <Text style={styles.buttonText}>
          Search
        </Text>
      </Pressable>

      {loading && (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="small" />
    <Text style={styles.loading}>
      Finding plants...
    </Text>
  </View>
)}
    {!loading && query.trim() && results.length === 0 && (
  <View style={styles.emptyState}>
    <Text style={styles.emptyEmoji}>🌱</Text>

    <Text style={styles.emptyTitle}>
      No plants found
    </Text>

    <Text style={styles.emptyText}>
      Try searching for another plant name.
    </Text>
  </View>
)}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
  <View style={styles.card}>

    {item.default_image?.regular_url ? (
      <Image
        source={{
          uri: item.default_image.regular_url,
        }}
        style={styles.image}
      />
    ) : null}

    <Text style={styles.name}>
      {item.common_name || item.scientific_name?.[0]}
    </Text>

    <Pressable
  style={styles.addButton}
  onPress={async () => {

  const details = await getPlantDetails(item.id);

  if (!details) return;

  addPlant({
  name: details.common_name || "Unknown Plant",

  water:
    details.watering || "Unknown",

  light:
    details.sunlight?.join(", ") || "Unknown",

  image:
    details.default_image?.regular_url || "",
});

  navigation.navigate("Home");
}}
>
  <Text style={styles.addButtonText}>
    Add to My Plants 🌿
  </Text>
</Pressable>

  </View>
)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f7f2",
  },


  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },


  card: {
  backgroundColor: "white",
  borderRadius: 20,
  padding: 15,
  marginBottom: 15,
  elevation: 2,
},

  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },

  name: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#123F21",
},

  addButton: {
  backgroundColor: "#174d2c",
  padding: 12,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 12,
},

addButtonText: {
  color: "white",
  fontWeight: "bold",
},

header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 20,
  marginBottom: 20,
},

title: {
  fontSize: 30,
  fontWeight: "bold",
  color: "#123F21",
},

subtitle: {
  fontSize: 14,
  color: "#666",
  marginTop: 4,
  maxWidth: 280,
  lineHeight: 20,
},

headerEmoji: {
  fontSize: 32,
},

input: {
  backgroundColor: "white",
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
  fontSize: 16,
  borderWidth: 1,
  borderColor: "#E2E8DE",
},

button: {
  backgroundColor: "#123F21",
  padding: 16,
  borderRadius: 16,
  alignItems: "center",
  marginBottom: 20,
},

loadingContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 15,
},

loading: {
  marginLeft: 8,
  fontSize: 15,
  color: "#666",
},

emptyState: {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 40,
},

emptyEmoji: {
  fontSize: 45,
  marginBottom: 10,
},

emptyTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#123F21",
  marginBottom: 5,
},

emptyText: {
  fontSize: 14,
  color: "#666",
  textAlign: "center",
},
});