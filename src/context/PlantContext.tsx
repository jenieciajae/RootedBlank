import { createContext, useContext, useState } from "react";

type Plant = {
  name: string;
  water: string;
  light: string;
};

type PlantContextType = {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
};

const PlantContext = createContext<PlantContextType | undefined>(undefined);


export function PlantProvider({ children }: any) {

  const [plants, setPlants] = useState<Plant[]>([
    {
      name: "Monstera",
      water: "Every 7 days",
      light: "Bright indirect light",
    },
    {
      name: "Snake Plant",
      water: "Every 2 weeks",
      light: "Low light",
    },
  ]);


  const addPlant = (plant: Plant) => {
    setPlants((currentPlants) => [
      ...currentPlants,
      plant,
    ]);
  };


  return (
    <PlantContext.Provider value={{ plants, addPlant }}>
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
