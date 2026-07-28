import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import PlantCard from "../components/PlantCard";
import { usePlants } from "../context/PlantContext";

export default function HomeScreen({ navigation }: any) {

  const { plants } = usePlants();
  console.log("Plants:", plants);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Rooted 🌿
      </Text>

      <Text style={styles.subtitle}>
        Your Plant Collection
      </Text>

      <ScrollView>
        {plants.map((plant, index) => (
          <PlantCard
            key={index}
            name={plant.name}
            water={plant.water}
            light={plant.light}
          />
        ))}
      </ScrollView>

      <Button
        title="Add Plant"
        onPress={() => navigation.navigate("AddPlant")}
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
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
  },
});