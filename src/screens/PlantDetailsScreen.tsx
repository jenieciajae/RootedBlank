import { View, Text, StyleSheet } from "react-native";

export default function PlantDetailsScreen({ route }: any) {

  const { plant } = route.params;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🌱 {plant.name}
      </Text>

      <Text style={styles.label}>
        💧 Water Schedule
      </Text>

      <Text style={styles.detail}>
        {plant.water}
      </Text>

      <Text style={styles.label}>
        ☀️ Light Requirements
      </Text>

      <Text style={styles.detail}
      >
        {plant.light}
      </Text>

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
    marginBottom: 30,
  },

  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },

  detail: {
    fontSize: 18,
    marginTop: 8,
  },
});