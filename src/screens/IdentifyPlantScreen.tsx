import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { identifyPlant } from "../api/plantApi";


export default function IdentifyPlantScreen({ navigation }: any) {

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
      setLoading(false);
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
      setLoading(true);
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
      setLoading(false);
      console.log(
        "Identification error:",
        error
      );

    }

  }

};

  return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
  >

    <View style={styles.header}>
      <View>
        <Text style={styles.title}>
          Identify a Plant
        </Text>

        <Text style={styles.description}>
          Take or upload a photo and Rooted will help identify your plant.
        </Text>
      </View>

      <Text style={styles.headerEmoji}>
        📷
      </Text>
    </View>

    {image ? (
      <View style={styles.previewCard}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />

        <Text style={styles.previewText}>
          Your plant photo
        </Text>
      </View>
    ) : (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderEmoji}>
          🌿
        </Text>

        <Text style={styles.placeholderTitle}>
          Ready to identify?
        </Text>

        <Text style={styles.placeholderText}>
          Choose a photo from your gallery or take a new one.
        </Text>
      </View>
    )}

    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Identifying your plant...
        </Text>
      </View>
    ) : (
      <>
        <Pressable
          style={styles.primaryButton}
          onPress={takePhoto}
        >
          <Text style={styles.buttonText}>
            📷 Take Plant Photo
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={pickImage}
        >
          <Text style={styles.secondaryButtonText}>
            🖼️ Choose From Gallery
          </Text>
        </Pressable>
      </>
    )}

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
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 21,
    maxWidth: 290,
  },

  headerEmoji: {
    fontSize: 34,
  },

  placeholder: {
    backgroundColor: "#E8F0E5",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    marginBottom: 25,
  },

  placeholderEmoji: {
    fontSize: 55,
    marginBottom: 12,
  },

  placeholderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#123F21",
    marginBottom: 6,
  },

  placeholderText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },

  previewCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    marginBottom: 25,
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 280,
    borderRadius: 14,
  },

  previewText: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    marginLeft: 4,
  },

  primaryButton: {
    backgroundColor: "#123F21",
    padding: 17,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  secondaryButton: {
    backgroundColor: "#EA9BA1",
    padding: 17,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  secondaryButtonText: {
    color: "#123F21",
    fontSize: 17,
    fontWeight: "bold",
  },

  loadingContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#666",
  },

});