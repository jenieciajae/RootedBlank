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
} from "react-native";

import { searchPlants } from "../api/plantApi";

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

      <Text style={styles.title}>
        Search Plants 🌱
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search for a plant..."
        value={query}
        onChangeText={setQuery}
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
        <Text style={styles.loading}>
          Searching...
        </Text>
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
  onPress={() => {
    addPlant({
      name: item.common_name || item.scientific_name?.[0] || "Unknown Plant",
      water: item.watering || "Unknown",
      light: Array.isArray(item.sunlight)
        ? item.sunlight.join(", ")
        : item.sunlight || "Unknown",
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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#174d2c",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  loading: {
    marginBottom: 15,
    fontSize: 16,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
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
});