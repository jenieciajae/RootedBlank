import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";

import { usePlants } from "../context/PlantContext";
import { schedulePlantReminder } from "../utils/Notifications";


export default function PlantDetailsScreen({ route, navigation }: any) {

 const { plant: passedPlant } = route.params;

const { plants } = usePlants();

const plant = plants.find(
  (p) => p.id === passedPlant.id
);

if (!plant) {
  return (
    <View style={styles.container}>
      <Text>
        Plant not found
      </Text>
    </View>
  );
}

console.log(
  "CURRENT PLANT:",
  JSON.stringify(plant, null, 2)
);
  const {
    deletePlant,
    waterPlant,
    updatePlant,
  } = usePlants();


  const toggleFavorite = () => {

    updatePlant({
      ...plant,
      favorite: !plant.favorite,
    });

  };


  return (
  <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >


      <View style={styles.detailsHeader}>
  <Text style={styles.title}>
    Plant Details
  </Text>

  <Text style={styles.headerEmoji}>
    🌿
  </Text>
</View>



      {plant.image && (
        <Image
          source={{ uri: plant.image }}
          style={styles.image}
        />
      )}



      <View style={styles.card}>


        <Text style={styles.plantName}>
          {plant.name}
        </Text>


        <Text style={styles.info}>
          💧 Water: {plant.water}
        </Text>


        <Text style={styles.info}>
          ☀️ Light: {plant.light}
        </Text>
        <Text style={styles.info}>
          💧 Last Watered:{" "}
           {plant.lastWatered
          ? new Date(plant.lastWatered).toLocaleDateString()
          : "Not yet watered"}
        </Text>


        <Text style={styles.info}>
           🌱 Next Watering:{" "}
           {plant.nextWatering
           ? new Date(plant.nextWatering).toLocaleDateString()
          : "Not scheduled"}
        </Text>

        <Text style={styles.info}>
          ⭐ Favorite: {plant.favorite ? "Yes" : "No"}
        </Text>


        


      </View>



      <Pressable
        style={styles.button}
        onPress={() => {

        waterPlant(plant.id);

       schedulePlantReminder(
        plant.name,
        plant.water
);

      }}
      >

        <Text style={styles.buttonText}>
          💧 Mark as Watered
        </Text>

      </Pressable>



      <Pressable
  style={styles.secondaryButton}
  onPress={toggleFavorite}
>

        <Text style={styles.secondaryButtonText}>
  {plant.favorite
    ? "⭐ Remove Favorite"
    : "☆ Add Favorite"}
</Text>

      </Pressable>

<Pressable
  style={styles.secondaryButton}
  onPress={() =>
    navigation.navigate("EditPlant", {
      plant,
    })
  }
>
  <Text style={styles.buttonText}>
    ✏️ Edit Plant
  </Text>
</Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={() => {

          deletePlant(plant.id);

          navigation.navigate("Home");

        }}
      >

        <Text style={styles.buttonText}>
          🗑️ Delete Plant
        </Text>

      </Pressable>


        </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f7f2",
    padding: 20,
  },


  title: {
  fontSize: 30,
  fontWeight: "bold",
  color: "#123F21",
},


  image: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },


  card: {
  backgroundColor: "white",
  padding: 20,
  borderRadius: 20,
  marginBottom: 20,
  elevation: 2,
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 8,
},


  plantName: {
  fontSize: 26,
  fontWeight: "bold",
  marginBottom: 15,
  color: "#123F21",
},


  info: {
    fontSize: 17,
    marginBottom: 10,
  },


  button: {
    backgroundColor: "#174d2c",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },


  deleteButton: {
    backgroundColor: "#b23b3b",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },


  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  content: {
  paddingBottom: 30,
},
detailsHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
},

headerEmoji: {
  fontSize: 32,
},

secondaryButton: {
  backgroundColor: "#EA9BA1",
  padding: 16,
  borderRadius: 16,
  alignItems: "center",
  marginBottom: 12,
},

secondaryButtonText: {
  color: "#123F21",
  fontWeight: "bold",
  fontSize: 16,
},

});