import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet 
} from "react-native";

import { useState } from "react";
import { usePlants } from "../context/PlantContext";

export default function AddPlantScreen({ navigation }: any) {

  const { addPlant } = usePlants();

  const [name, setName] = useState("");
  const [water, setWater] = useState("");
  const [light, setLight] = useState("");

  const handleSave = () => {
  addPlant({
    name,
    water,
    light,
  });

  alert("Plant saved 🌱");

  navigation.navigate("Home");
};


  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Add a Plant 🌿
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Plant name"
        value={name}
        onChangeText={setName}
      />


      <TextInput
        style={styles.input}
        placeholder="Water schedule"
        value={water}
        onChangeText={setWater}
      />


      <TextInput
        style={styles.input}
        placeholder="Light requirements"
        value={light}
        onChangeText={setLight}
      />


      <Button
        title="Save Plant"
        onPress={handleSave}
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
});
