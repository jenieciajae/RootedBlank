import { useEffect } from "react";

import AppNavigator from "./src/navigation/AppNavigator";
import { PlantProvider } from "./src/context/PlantContext";
import { requestNotificationPermissions } from "./src/utils/Notifications";


export default function App() {

  useEffect(() => {

    requestNotificationPermissions();

  }, []);


  return (
    <PlantProvider>
      <AppNavigator />
    </PlantProvider>
  );
}