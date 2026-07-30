import { View, Text, StyleSheet } from "react-native";
import { usePlants } from "../context/PlantContext";
import { needsWatering } from "../utils/Watering";

export default function StatisticsScreen() {
  const { plants } = usePlants();

  const today = new Date().toLocaleDateString();

  const totalPlants = plants.length;

  const favorites = plants.filter(
    (plant) => plant.favorite
  ).length;

  const wateredToday = plants.filter(
    (plant) => plant.lastWatered === today
  ).length;

  const needWatering = plants.filter((plant) =>
    needsWatering(plant.lastWatered, plant.water)
  ).length;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        📊 Plant Statistics
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          🌿 Total Plants
        </Text>

        <Text style={styles.number}>
          {totalPlants}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          ⭐ Favorites
        </Text>

        <Text style={styles.number}>
          {favorites}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          💧 Watered Today
        </Text>

        <Text style={styles.number}>
          {wateredToday}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          🚨 Need Watering
        </Text>

        <Text style={styles.number}>
          {needWatering}
        </Text>
      </View>

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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
  },

  label: {
    fontSize: 18,
    color: "#555",
  },

  number: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#174d2c",
    marginTop: 10,
  },
});