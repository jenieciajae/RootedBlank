import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { useState, useEffect } from "react";

import { usePlants } from "../context/PlantContext";
import { searchPlants, getPlantDetails } from "../api/plantApi";


export default function PlantResultScreen({ route, navigation }: any) {

  const { image, plantResult } = route.params;

  const { addPlant } = usePlants();

  const [careDetails, setCareDetails] = useState<any>(null);
const [careLoading, setCareLoading] = useState(true);


  const species =
    plantResult?.results?.[0]?.species;


  const plantName =
    species?.commonNames?.[0] ||
    species?.scientificNameWithoutAuthor ||
    "Unknown plant";



  const getPlantCare = async () => {

    console.log(
      "LOOKING UP:",
      species?.scientificNameWithoutAuthor
    );


    const results = await searchPlants(
      species?.scientificNameWithoutAuthor
    );


    console.log(
      "PERENUAL SEARCH:",
      results
    );


    if (results.length > 0) {

      const details = await getPlantDetails(
        results[0].id
      );


      console.log(
        "PERENUAL DETAILS:",
        details
      );


      return details;

    }


    console.log(
      "NO PERENUAL MATCH"
    );


    return null;

  };



  useEffect(() => {

  if (!species?.scientificNameWithoutAuthor) {
    setCareLoading(false);
    return;
  }

  setCareLoading(true);

  getPlantCare()
    .then((data) => {
      setCareDetails(data);
    })
    .catch((error) => {
      console.log("CARE LOOKUP ERROR:", error);
      setCareDetails(null);
    })
    .finally(() => {
      setCareLoading(false);
    });

}, [plantResult]);



  return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
  >
<View style={styles.header}>
  <View>
    <Text style={styles.title}>
      Plant Found!
    </Text>

    <Text style={styles.subtitle}>
      Here's what Rooted found from your photo.
    </Text>
  </View>

  <Text style={styles.headerEmoji}>
    🌿
  </Text>
</View>

<View style={styles.imageCard}>
  <Image
    source={{ uri: image }}
    style={styles.image}
  />
</View>

<View style={styles.card}>

  <Text style={styles.plantName}>
    {plantName}
  </Text>

  <View style={styles.confidenceBadge}>
    <Text style={styles.confidenceText}>
      ✨ {Math.round(
        (plantResult?.results?.[0]?.score || 0) * 100
      )}% match
    </Text>
  </View>

  <View style={styles.divider} />

  <Text style={styles.info}>
    💧 Water
  </Text>

  <Text style={styles.infoValue}>
  {careLoading
    ? "Finding care information..."
    : careDetails?.watering || "Care information unavailable"}
</Text>

  <Text style={styles.info}>
    ☀️ Light
  </Text>

  <Text style={styles.infoValue}>
  {careLoading
    ? "Finding care information..."
    : careDetails?.sunlight?.[0] || "Care information unavailable"}
</Text>

  <Text style={styles.info}>
    🌱 Difficulty
  </Text>

  <Text style={styles.infoValue}>
  {careLoading
    ? "Finding care information..."
    : careDetails?.care_level || "Not available"}
</Text>

</View>


<Pressable
  style={styles.button}
  onPress={() => {
    addPlant({
      name: plantName,
      water: careDetails?.watering || "Unknown",
      light: careDetails?.sunlight?.[0] || "Unknown",
      image: image,
      lastWatered: undefined,
      favorite: false,
    });

    navigation.navigate("Home");
  }}
>
  <Text style={styles.buttonText}>
    🌱 Add to My Plants
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
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 20,
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

  headerEmoji: {
    fontSize: 34,
  },

  imageCard: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 280,
    borderRadius: 14,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 2,
  },

  plantName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#123F21",
    marginBottom: 10,
  },

  confidenceBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F0E5",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  confidenceText: {
    color: "#123F21",
    fontWeight: "bold",
    fontSize: 13,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 18,
  },

  info: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#123F21",
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 15,
    color: "#666",
    marginBottom: 14,
  },

  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  loadingText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#123F21",
    padding: 17,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

});