import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

import { useState, useEffect } from "react";

import { usePlants } from "../context/PlantContext";
import { searchPlants, getPlantDetails } from "../api/plantApi";


export default function PlantResultScreen({ route, navigation }: any) {

  const { image, plantResult } = route.params;

  const { addPlant } = usePlants();

  const [careDetails, setCareDetails] = useState<any>(null);


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

    if (species?.scientificNameWithoutAuthor) {

      getPlantCare().then((data) => {

        setCareDetails(data);

      });

    }

  }, [plantResult]);



  return (
    <View style={styles.container}>


      <Text style={styles.title}>
        🌿 Plant Found!
      </Text>



      <Image
        source={{ uri: image }}
        style={styles.image}
      />



      <View style={styles.card}>


        <Text style={styles.plantName}>
          {plantName}
        </Text>



        <Text style={styles.info}>
          ⭐ Confidence: {
            Math.round(
              (plantResult?.results?.[0]?.score || 0) * 100
            )
          }%
        </Text>



        <Text style={styles.info}>
          💧 Water: {
            careDetails?.watering || "Loading..."
          }
        </Text>



        <Text style={styles.info}>
          ☀️ Light: {
            careDetails?.sunlight?.[0] || "Loading..."
          }
        </Text>



        <Text style={styles.info}>
          🌱 Difficulty: {
            careDetails?.care_level || "Not available"
          }
        </Text>


      </View>



      <Pressable
        style={styles.button}
        onPress={() => {


          addPlant({

            name: plantName,


            water:
              careDetails?.watering || "Unknown",


            light:
              careDetails?.sunlight?.[0] || "Unknown",


            image: image,


            lastWatered: undefined,


            favorite: false,

          });


          navigation.navigate("Home");


        }}
      >


        <Text style={styles.buttonText}>
          ➕ Add to My Plants
        </Text>


      </Pressable>


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
    marginBottom: 20,
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
    borderRadius: 18,
    marginBottom: 20,
  },


  plantName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },


  info: {
    fontSize: 16,
    marginBottom: 8,
  },


  button: {
    backgroundColor: "#174d2c",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },


  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

});