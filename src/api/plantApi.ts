const API_KEY = "sk-zhb06a6811c96497719034";

export async function searchPlants(query: string) {

  try {
    const response = await fetch(
      `https://perenual.com/api/v2/species-list?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch plants.");
    }

    const data = await response.json();

    return data.data || [];

  } catch (error) {
    console.error("Plant search error:", error);
    return [];
  }
}


export async function getPlantDetails(id: number) {

  try {
    const response = await fetch(
      `https://perenual.com/api/v2/species/details/${id}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch plant details.");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Plant details error:", error);
    return null;
  }
}


// Existing Perenual functions stay here


const PLANTNET_API_KEY = "2b10reU8lu8ocpxXp4DjKPcqJ";

export async function identifyPlant(imageUri: string) {

  const formData = new FormData();

  formData.append("images", {
    uri: imageUri,
    name: "plant.jpeg",
    type: "image/jpeg",
  } as any);


  const response = await fetch(
    `https://my-api.plantnet.org/v2/identify/k-world-flora?api-key=${PLANTNET_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );


  const data = await response.json();

  console.log("PLANTNET RESPONSE:", data);

  return data;
}