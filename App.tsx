import AppNavigator from "./src/navigation/AppNavigator";
import { PlantProvider } from "./src/context/PlantContext";

export default function App() {
  return (
    <PlantProvider>
      <AppNavigator />
    </PlantProvider>
  );
}