import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { identifyPlant } from "../api/plantApi";


export default function IdentifyPlantScreen({ navigation }: any) {

  const [image, setImage] = useState<string | null>(null);


  const pickImage = async () => {

  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert("Permission needed to access photos");
    return;
  }


  const result =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });


  if (!result.canceled) {

    const imageUri = result.assets[0].uri;

    setImage(imageUri);

    try {

      const plantResult = await identifyPlant(imageUri);

      console.log(
        "PLANT RESULT:",
        plantResult
      );


      console.log("NAVIGATING TO RESULT SCREEN");

navigation.navigate("PlantResult", {
  image: imageUri,
  plantResult: plantResult,
});


    } catch (error) {

      console.log(
        "Identification error:",
        error
      );

    }

  }

};


const takePhoto = async () => {
console.log("TAKE PHOTO PRESSED");
  const permission =
    await ImagePicker.requestCameraPermissionsAsync();


  if (!permission.granted) {
    alert("Camera permission is required");
    return;
  }


  const result =
    await ImagePicker.launchCameraAsync({
      quality: 1,
    });


  if (!result.canceled) {

    const imageUri = result.assets[0].uri;
console.log("IMAGE URI:", imageUri);
    setImage(imageUri);


    try {

      const plantResult = await identifyPlant(imageUri);
console.log("CALLING PLANTNET");
      console.log(
  "BEST MATCH:",
  plantResult?.results?.[0]?.species
);


      navigation.navigate("PlantResult", {
        image: imageUri,
        plantResult: plantResult,
      });


    } catch (error) {

      console.log(
        "Identification error:",
        error
      );

    }

  }

};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🌿 Identify a Plant
      </Text>


      <Text style={styles.description}>
        Upload a picture of a plant and Rooted will help identify it.
      </Text>


      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}


      <Pressable
        style={styles.cameraButton}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>
          🖼️ Choose Plant Photo
        </Text>
      </Pressable>
      <Pressable
  style={styles.cameraButton}
  onPress={takePhoto}
>
  <Text style={styles.buttonText}>
    📷 Take Plant Photo
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
    justifyContent: "center",
  },


  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 15,
  },


  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },


  image: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    marginBottom: 25,
  },


  cameraButton: {
  backgroundColor: "#174d2c",
  padding: 18,
  borderRadius: 16,
  alignItems: "center",
  marginBottom: 15,
},


  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

});