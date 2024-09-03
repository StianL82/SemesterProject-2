import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";

export async function getListings() {
  try {
    const getListingsURL = `${API_AUCTION_URL}${action}?_seller=true&_bids=true`;

    // Logg URL-en for å sjekke om den er riktig
    console.log("Fetching listings from URL:", getListingsURL);

    const response = await authFetch(getListingsURL);

    // Logg statuskoden for å se om forespørselen var vellykket
    console.log("Response status:", response.status);

    const data = await response.json();

    // Logg dataen for å se hva som blir returnert
    console.log("Listings data received:", data);

    return data;
  } catch (error) {
    console.error("An error occurred while fetching the listings:", error);
    throw error;
  }
}
