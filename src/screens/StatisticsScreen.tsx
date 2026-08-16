import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { usePlants } from "../context/PlantContext";

export default function StatisticsScreen() {

  const { plants } = usePlants();

  const totalPlants = plants.length;

  const favoritePlants = plants.filter(
    (plant) => plant.favorite
  ).length;

  const wateredPlants = plants.filter(
    (plant) => plant.lastWatered
  ).length;

  const plantsNeedingWater = plants.filter(
    (plant) => {
      if (!plant.nextWatering) return false;

      return new Date(plant.nextWatering) <= new Date();
    }
  ).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>

        <View>
          <Text style={styles.title}>
            Plant Statistics
          </Text>

          <Text style={styles.subtitle}>
            A quick look at your plant collection.
          </Text>
        </View>

        <Text style={styles.emoji}>
          📊
        </Text>

      </View>


      <View style={styles.grid}>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>
            🌿
          </Text>

          <Text style={styles.statNumber}>
            {totalPlants}
          </Text>

          <Text style={styles.statLabel}>
            Total Plants
          </Text>
        </View>


        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>
            ⭐
          </Text>

          <Text style={styles.statNumber}>
            {favoritePlants}
          </Text>

          <Text style={styles.statLabel}>
            Favorites
          </Text>
        </View>


        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>
            💧
          </Text>

          <Text style={styles.statNumber}>
            {wateredPlants}
          </Text>

          <Text style={styles.statLabel}>
            Watered
          </Text>
        </View>


        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>
            🪴
          </Text>

          <Text style={styles.statNumber}>
            {plantsNeedingWater}
          </Text>

          <Text style={styles.statLabel}>
            Need Water
          </Text>
        </View>

      </View>


      <View style={styles.summaryCard}>

        <Text style={styles.summaryTitle}>
          Your Collection 🌱
        </Text>

        {plants.length === 0 ? (

          <Text style={styles.emptyText}>
            Add some plants to start tracking your collection.
          </Text>

        ) : (

          <>

            <Text style={styles.summaryText}>
              You currently have{" "}
              <Text style={styles.bold}>
                {totalPlants}
              </Text>{" "}
              {totalPlants === 1 ? "plant" : "plants"} in your
              collection.
            </Text>

            <Text style={styles.summaryText}>
              {" "}
              {favoritePlants > 0
                ? `${favoritePlants} ${
                    favoritePlants === 1
                      ? "plant is"
                      : "plants are"
                  } marked as a favorite.`
                : "You haven't added any favorites yet."}
            </Text>

            <Text style={styles.summaryText}>
              {" "}
              {plantsNeedingWater > 0
                ? `${plantsNeedingWater} ${
                    plantsNeedingWater === 1
                      ? "plant needs"
                      : "plants need"
                  } watering.`
                : "Your plants are all caught up on watering! 🎉"}
            </Text>

          </>

        )}

      </View>

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
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#123F21",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    maxWidth: 280,
    lineHeight: 20,
  },

  emoji: {
    fontSize: 34,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    alignItems: "center",
    elevation: 2,
  },

  statEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#123F21",
  },

  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  summaryCard: {
    backgroundColor: "#E8F0E5",
    borderRadius: 20,
    padding: 22,
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#123F21",
    marginBottom: 15,
  },

  summaryText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 8,
  },

  bold: {
    fontWeight: "bold",
    color: "#123F21",
  },

  emptyText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },

});