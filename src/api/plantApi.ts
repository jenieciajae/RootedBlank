const API_KEY = "sk-zhb06a6811c96497719034";

export async function searchPlants(query: string) {

try{
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
