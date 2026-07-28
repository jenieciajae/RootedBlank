import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AddPlantScreen from "../screens/AddPlantScreen";
import PlantDetailsScreen from "../screens/PlantDetailsScreen";
import EditPlantScreen from "../screens/EditPlantScreen";
import PlantSearch from "../screens/PlantSearch";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />

        <Stack.Screen 
          name="AddPlant" 
          component={AddPlantScreen} 
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
  name="PlantSearch"
  component={PlantSearch}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}