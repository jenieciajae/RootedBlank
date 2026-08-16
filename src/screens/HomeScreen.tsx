import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

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
      <View style={styles.header}>
  <View>
    <Text style={styles.greeting}>
      Welcome back 🌿
    </Text>

    <Text style={styles.title}>
      Your Garden
    </Text>
  </View>

  <Text style={styles.headerEmoji}>
    🪴
  </Text>
</View>

      <View style={styles.sectionHeader}>
  <View>
    <Text style={styles.sectionTitle}>
      Today's Tasks
    </Text>

    <Text style={styles.sectionSubtitle}>
      Keep your plants happy and healthy
    </Text>
  </View>

  <Text style={styles.taskEmoji}>🌱</Text>
</View>
      
<View style={styles.quickActions}>

  <Pressable
    style={styles.quickActionCard}
    onPress={() => navigation.navigate("Statistics")}
  >
    <Text style={styles.quickActionEmoji}>
      📊
    </Text>

    <Text style={styles.quickActionTitle}>
      Statistics
    </Text>

    <Text style={styles.quickActionSubtitle}>
      View your garden
    </Text>
  </Pressable>

  <Pressable
    style={[styles.quickActionCard, styles.favoriteCard]}
    onPress={() => navigation.navigate("Favorites")}
  >
    <Text style={styles.quickActionEmoji}>
      ⭐
    </Text>

    <Text style={[styles.quickActionTitle, styles.favoriteCardTitle]}>
  Favorites
</Text>

<Text style={[styles.quickActionSubtitle, styles.favoriteCardSubtitle]}>
  Your favorite plants
</Text>
  </Pressable>

</View>

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

      <View style={styles.collectionHeader}>
  <View>
    <Text style={styles.subtitle}>
      Your Plants
    </Text>

    <Text style={styles.collectionCount}>
      {plants.length} {plants.length === 1 ? "plant" : "plants"} in your collection
    </Text>
  </View>

  <Text style={styles.collectionEmoji}>
    🪴
  </Text>
</View>

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


      <View style={styles.addSection}>
  <Text style={styles.addSectionTitle}>
    Add a New Plant
  </Text>

  <Text style={styles.addSectionSubtitle}>
    Search our plant library or identify one with your camera.
  </Text>

  <CustomButton
    title="🔍 Search Plants"
    onPress={() => navigation.navigate("PlantSearch")}
  />

  <CustomButton
    title="📷 Identify Plant"
    onPress={() => navigation.navigate("IdentifyPlant")}
  />
</View>
    </ScrollView>
    <Pressable
  style={styles.fab}
  onPress={() => navigation.navigate("AddPlant")}
>
  <Text style={styles.fabText}>🌱</Text>
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


  

  noTasks: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },

  subtitle: {
  fontSize: 23,
  fontWeight: "bold",
  color: "#123F21",
},

  fab: {
  position: "absolute",
  bottom: 25,
  right: 25,
  width: 62,
  height: 62,
  borderRadius: 31,
  backgroundColor: "#123F21",
  justifyContent: "center",
  alignItems: "center",
  elevation: 8,
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 8,
},

fabText: {
  fontSize: 27,
},

header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 20,
  marginBottom: 25,
},

greeting: {
  fontSize: 16,
  color: "#3AAE9E",
  fontWeight: "600",
  marginBottom: 4,
},

title: {
  fontSize: 32,
  fontWeight: "bold",
  color: "#123F21",
},

headerEmoji: {
  fontSize: 42,
},
sectionHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 15,
},

sectionTitle: {
  fontSize: 23,
  fontWeight: "bold",
  color: "#123F21",
  marginBottom: 4,
},

sectionSubtitle: {
  fontSize: 14,
  color: "#666",
},

taskEmoji: {
  fontSize: 30,
},
collectionHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
  marginBottom: 15,
},

collectionCount: {
  fontSize: 14,
  color: "#666",
  marginTop: 2,
},

collectionEmoji: {
  fontSize: 30,
},
addSection: {
  marginTop: 15,
  marginBottom: 20,
},

addSectionTitle: {
  fontSize: 21,
  fontWeight: "bold",
  color: "#123F21",
  marginBottom: 4,
},

addSectionSubtitle: {
  fontSize: 14,
  color: "#666",
  marginBottom: 15,
  lineHeight: 20,
},

quickActions: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
},

quickActionCard: {
  width: "48%",
  backgroundColor: "#123F21",
  borderRadius: 18,
  padding: 16,
},

favoriteCard: {
  backgroundColor: "#EA9BA1",
},

quickActionEmoji: {
  fontSize: 25,
  marginBottom: 8,
},

quickActionTitle: {
  fontSize: 17,
  fontWeight: "bold",
  color: "white",
  marginBottom: 3,
},

quickActionSubtitle: {
  fontSize: 12,
  color: "rgba(255,255,255,0.8)",
},

favoriteCardTitle: {
  color: "#123F21",
},

favoriteCardSubtitle: {
  color: "#31563F",
},
});
