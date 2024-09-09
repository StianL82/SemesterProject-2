import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const searchAction = "/listings/search";

// Funksjon for å søke etter oppføringer basert på en spørring (query)
export async function searchListingsFromAPI(query) {
  try {
    const searchURL = `${API_AUCTION_URL}${searchAction}?q=${encodeURIComponent(
      query
    )}`;

    const response = await authFetch(searchURL);

    if (!response.ok) {
      throw new Error(`Error fetching search results: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while searching for listings:", error);
    throw error;
  }
}
