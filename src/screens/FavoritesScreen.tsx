import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import PlantCard from "../components/PlantCard";
import { usePlants } from "../context/PlantContext";

export default function FavoritesScreen({ navigation }: any) {

  const { plants } = usePlants();

  const favorites = plants.filter(
    (plant) => plant.favorite
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            My Favorites
          </Text>

          <Text style={styles.subtitle}>
            Your favorite plants, all in one place.
          </Text>
        </View>

        <Text style={styles.emoji}>
          ⭐
        </Text>
      </View>

      {favorites.length === 0 ? (

        <View style={styles.emptyState}>

          <Text style={styles.emptyEmoji}>
            🌱
          </Text>

          <Text style={styles.emptyTitle}>
            No favorites yet
          </Text>

          <Text style={styles.emptyText}>
            Tap the star on a plant to add it to your favorites.
          </Text>

        </View>

      ) : (

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (

            <PlantCard
              id={item.id}
              name={item.name}
              water={item.water}
              light={item.light}
              image={item.image}
              favorite={item.favorite}
              navigation={navigation}
            />

          )}
        />

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f7f2",
    padding: 20,
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
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    maxWidth: 280,
    lineHeight: 20,
  },

  emoji: {
    fontSize: 34,
  },

  list: {
    paddingBottom: 30,
  },

  emptyState: {
    backgroundColor: "#E8F0E5",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    marginTop: 20,
  },

  emptyEmoji: {
    fontSize: 50,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#123F21",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },

});