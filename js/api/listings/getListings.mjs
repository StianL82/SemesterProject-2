import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";

// Funksjon for å hente en spesifikk side med et spesifikt antall listings
export async function getListings(limit = 20, page = 1) {
  try {
    const getListingsURL = `${API_AUCTION_URL}${action}?_seller=true&_bids=true&limit=${limit}&page=${page}`;

    const response = await authFetch(getListingsURL);

    const data = await response.json();

    console.log("Listings data received:", data);

    return data;
  } catch (error) {
    console.error("An error occurred while fetching the listings:", error);
    throw error;
  }
}
