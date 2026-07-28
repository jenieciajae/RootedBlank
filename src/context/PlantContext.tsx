import { 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";


type Plant = {
  id: string;
  name: string;
  water: string;
  light: string;
};


type PlantContextType = {
  plants: Plant[];
  addPlant: (plant: Omit<Plant, "id">) => void;
  deletePlant: (id: string) => void;
  updatePlant: (plant: Plant) => void;
};


const PlantContext = createContext<PlantContextType | undefined>(undefined);


const PLANTS_KEY = "@rooted_plants";


export function PlantProvider({ children }: any) {

  const [plants, setPlants] = useState<Plant[]>([
    {
      id: "1",
      name: "Monstera",
      water: "Every 7 days",
      light: "Bright indirect light",
    },
    {
      id: "2",
      name: "Snake Plant",
      water: "Every 2 weeks",
      light: "Low light",
    },
  ]);


  // Load saved plants when app starts
  useEffect(() => {

    const loadPlants = async () => {

      try {
        const savedPlants = await AsyncStorage.getItem(PLANTS_KEY);

        if (savedPlants) {
          setPlants(JSON.parse(savedPlants));
        }

      } catch (error) {
        console.log("Error loading plants:", error);
      }

    };


    loadPlants();

  }, []);



  // Save plants whenever they change
  useEffect(() => {

    const savePlants = async () => {

      try {
        await AsyncStorage.setItem(
          PLANTS_KEY,
          JSON.stringify(plants)
        );

      } catch (error) {
        console.log("Error saving plants:", error);
      }

    };


    savePlants();

  }, [plants]);



  const addPlant = (plant: Omit<Plant, "id">) => {

    const newPlant = {
      ...plant,
      id: Date.now().toString(),
    };


    setPlants((currentPlants) => [
      ...currentPlants,
      newPlant,
    ]);

  };



  const deletePlant = (id: string) => {

    setPlants((currentPlants) =>
      currentPlants.filter(
        (plant) => plant.id !== id
      )
    );

  };

const updatePlant = (updatedPlant: Plant) => {

  setPlants((currentPlants) =>
    currentPlants.map((plant) =>
      plant.id === updatedPlant.id
        ? updatedPlant
        : plant
    )
  );

};
  return (
    <PlantContext.Provider
      value={{
  plants,
  addPlant,
  deletePlant,
  updatePlant,
}}
    >
      {children}
    </PlantContext.Provider>
  );

}



export function usePlants() {

  const context = useContext(PlantContext);

  if (!context) {
    throw new Error(
      "usePlants must be used inside PlantProvider"
    );
  }

  return context;

}
