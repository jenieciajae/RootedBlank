import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AddPlantScreen from "../screens/AddPlantScreen";
import PlantDetailsScreen from "../screens/PlantDetailsScreen";
import EditPlantScreen from "../screens/EditPlantScreen";
import PlantSearch from "../screens/PlantSearch";
import StatisticsScreen from "../screens/StatisticsScreen";
import IdentifyPlantScreen from "../screens/IdentifyPlantScreen";
import PlantResultScreen from "../screens/PlantResultScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

type RootStackParamList = {
  Home: undefined;
  AddPlant: undefined;
  PlantSearch: undefined;
  PlantDetails: { plant: any };
  EditPlant: { plant: any };
  Statistics: undefined;
  Favorites: undefined;
  IdentifyPlant: undefined;
  PlantResult: { image: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: "#f4f7f2",
    },
    headerTintColor: "#123F21",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerShadowVisible: false,
  }}
>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="AddPlant"
          component={AddPlantScreen}
        />

        <Stack.Screen
          name="PlantSearch"
          component={PlantSearch}
        />

        <Stack.Screen
          name="PlantDetails"
          component={PlantDetailsScreen}
        />

        <Stack.Screen
          name="EditPlant"
          component={EditPlantScreen}
        />
        <Stack.Screen
          name="Statistics"
          component={StatisticsScreen}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
        />
        <Stack.Screen
           name="IdentifyPlant"
           component={IdentifyPlantScreen}
        />
        <Stack.Screen
           name="PlantResult"
           component={PlantResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}