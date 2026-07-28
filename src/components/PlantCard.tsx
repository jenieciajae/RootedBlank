import { View, Text, StyleSheet } from "react-native";

type PlantCardProps = {
  name: string;
  water: string;
  light: string;
};

export default function PlantCard({ name, water, light }: PlantCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.plantName}>🌱 {name}</Text>

      <Text style={styles.info}>
        💧 Water: {water}
      </Text>

      <Text style={styles.info}>
        ☀️ Light: {light}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  plantName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    marginBottom: 5,
  },
});