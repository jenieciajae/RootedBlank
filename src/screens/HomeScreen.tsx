import { View, Text, Button, StyleSheet, ScrollView, Pressable } from "react-native";

import PlantCard from "../components/PlantCard";
import TaskCard from "../components/TaskCard";
import { usePlants } from "../context/PlantContext";
import CustomButton from "../components/CustomButton";
import { needsWatering } from "../utils/Watering";

export default function HomeScreen({ navigation }: any) {

  const { plants } = usePlants();

  const sortedPlants = [...plants].sort((a, b) => {
  if (a.favorite === b.favorite) return 0;
  return a.favorite ? -1 : 1;
});

  const tasks = plants.filter((plant) =>
  needsWatering(
    plant.lastWatered,
    plant.water
  )
);

  return (
    <View style={styles.container}>

  <ScrollView
    contentContainerStyle={styles.content}
  >
      <Text style={styles.title}>
        Rooted 🌿
      </Text>

      <Text style={styles.sectionTitle}>
        Today's Tasks 🌱
      </Text>
      
<Pressable
  style={styles.statsButton}
  onPress={() => navigation.navigate("Statistics")}
>
  <Text style={styles.statsText}>
    📊 View Statistics
  </Text>
</Pressable>
      {tasks.length > 0 ? (
        tasks.map((plant) => (
          <TaskCard
            key={plant.id}
            task={`Water ${plant.name}`}
          />
        ))
      ) : (
        <Text style={styles.noTasks}>
          🎉 All plants are cared for today!
        </Text>
      )}

      <Text style={styles.subtitle}>
        Your Plant Collection
      </Text>

      {sortedPlants.map((plant) => (
        <PlantCard
          key={plant.id}
          id={plant.id}
          name={plant.name}
          water={plant.water}
          light={plant.light}
          image={plant.image}
          favorite={plant.favorite}
          navigation={navigation}
        />
      ))}


      <CustomButton
        title="🔍 Search Plants"
         onPress={() => navigation.navigate("PlantSearch")}
     />
     <CustomButton
        title="📷 Identify Plant"
        onPress={() => navigation.navigate("IdentifyPlant")}
/>
    </ScrollView>
    <Pressable
  style={styles.fab}
  onPress={() => navigation.navigate("AddPlant")}
>
  <Text style={styles.fabText}>＋</Text>
</Pressable>
    </View>
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

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  noTasks: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    color: "#123F21",
  },
  fab: {
  position: "absolute",
  bottom: 25,
  right: 25,
  width: 65,
  height: 65,
  borderRadius: 32.5,
  backgroundColor: "#174d2c",
  justifyContent: "center",
  alignItems: "center",
  elevation: 8,
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 8,
},

fabText: {
  color: "white",
  fontSize: 34,
  fontWeight: "300",
},
statsButton: {
  backgroundColor: "#123F21",
  padding: 14,
  borderRadius: 12,
  alignItems: "center",
  marginBottom: 20,
},

statsText: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
},
});