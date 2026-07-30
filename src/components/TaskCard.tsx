import { View, Text, StyleSheet } from "react-native";

type TaskCardProps = {
  task: string;
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.task}>
        💧 {task}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  task: {
    fontSize: 16,
    fontWeight: "600",
  },
});