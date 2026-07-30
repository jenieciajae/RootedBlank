import { Pressable, Text, StyleSheet } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

export default function CustomButton({
  title,
  onPress,
}: CustomButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
  backgroundColor: "#174d2c",
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 12,
  marginBottom: 6,
  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 3,
},

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});