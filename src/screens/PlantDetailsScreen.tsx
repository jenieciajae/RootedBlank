import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  Image
} from "react-native";

import { usePlants } from "../context/PlantContext";
import { useEffect } from "react";


export default function PlantDetailsScreen({ route, navigation }: any) {

  const { plant } = route.params;

  const { plants, deletePlant, waterPlant } = usePlants();
const currentPlant = plants.find(
  (item) => item.id === plant.id
);

useEffect(() => {
  navigation.setParams({
    plant: currentPlant,
  });
}, [currentPlant]);

  const handleDelete = () => {
    deletePlant(plant.id);
    navigation.navigate("Home");
  };


  return (
    <View style={styles.container}>

      <View style={styles.imagePlaceholder}>

  {plant.image ? (
    <Image
      source={{
        uri: plant.image,
      }}
      style={styles.image}
    />
  ) : (
    <Text style={styles.imageText}>
      🌿
    </Text>
  )}

</View>


      <Text style={styles.title}>
         {currentPlant?.name}
        </Text>


      <View style={styles.card}>
        <Text style={styles.label}>
          💧 Water Schedule
        </Text>

        <Text style={styles.detail}>
          {currentPlant?.water}
        </Text>
      </View>


      <View style={styles.card}>
        <Text style={styles.label}>
          ☀️ Light Requirements
        </Text>

        <Text style={styles.detail}>
          {currentPlant?.light}
        </Text>
      </View>
    <View style={styles.card}>
        <Text style={styles.label}>
        💧 Last Watered
        </Text>

    <Text style={styles.detail}>
         {currentPlant?.lastWatered || "Not watered yet"}
    </Text>
    </View>
    <Pressable
  style={styles.waterButton}
  onPress={() => {
    if (currentPlant) {
      waterPlant(currentPlant.id);
    }
  }}
>
  <Text style={styles.waterText}>
    💧 Mark as Watered
  </Text>
</Pressable>
    <Pressable
    style={styles.editButton}
     onPress={() =>
    navigation.navigate("EditPlant", {
      plant,
    })
  }
        >
         <Text style={styles.editText}>
         ✏️ Edit Plant
        </Text>
        </Pressable>
      <Pressable 
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteText}>
          🗑 Delete Plant
        </Text>
      </Pressable>


    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f7f2",
  },

  imagePlaceholder: {
    height: 220,
    borderRadius: 20,
    backgroundColor: "#dce8d8",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
  width: "100%",
  height: "100%",
  borderRadius: 20,
},

  imageText: {
    fontSize: 80,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
  },

  detail: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },

  deleteButton: {
    backgroundColor: "#b33a3a",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
editButton: {
  backgroundColor: "#174d2c",
  padding: 16,
  borderRadius: 14,
  alignItems: "center",
  marginTop: 20,
},

editText: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
},
waterButton: {
  backgroundColor: "#5b8c5a",
  padding: 16,
  borderRadius: 14,
  alignItems: "center",
  marginTop: 10,
},

waterText: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
},
});