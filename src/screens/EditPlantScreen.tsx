import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

import { useState } from "react";
import { usePlants } from "../context/PlantContext";


export default function EditPlantScreen({ route, navigation }: any) {

  const { plant } = route.params;

  const { updatePlant } = usePlants();


  const [name, setName] = useState(plant.name);
  const [water, setWater] = useState(plant.water);
  const [light, setLight] = useState(plant.light);



  const handleSave = () => {

    updatePlant({
      id: plant.id,
      name,
      water,
      light,
    });


    navigation.navigate("Home");

  };



  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Edit {plant.name} 🌱
      </Text>


      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />


      <TextInput
        style={styles.input}
        value={water}
        onChangeText={setWater}
      />


      <TextInput
        style={styles.input}
        value={light}
        onChangeText={setLight}
      />


      <Button
        title="Save Changes"
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