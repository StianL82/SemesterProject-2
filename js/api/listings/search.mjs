import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Searches for listings in the API based on a given query.
 *
 * @param {string} query - The search query string.
 * @returns {Promise<Object|null>} A promise that resolves to the search results object if successful, or null if an error occurs.
 *
 * @throws {Error} Displays an error message if the request fails due to network issues, client errors, or server errors.
 */

const searchAction = "/listings/search";

export async function searchListingsFromAPI(query) {
  try {
    const searchURL = `${API_AUCTION_URL}${searchAction}?q=${encodeURIComponent(
      query,
    )}`;

    const response = await authFetch(searchURL);

    if (!response.ok) {
      const errorMessage = await response.text();

      if (response.status >= 400 && response.status < 500) {
        console.error("Client error during search:", errorMessage);
        alert(
          "Failed to search listings. Please check your input and try again.",
        );
      } else if (response.status >= 500) {
        console.error("Server error during search:", errorMessage);
        alert(
          "Failed to search listings due to a server error. Please try again later.",
        );
      } else {
        console.error("Unexpected error during search:", errorMessage);
        alert(
          "An unexpected error occurred during the search. Please try again.",
        );
      }
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error or unexpected error during search:", error);
    alert(
      "A network error occurred while searching for listings. Please check your internet connection and try again.",
    );
    return null;
  }
}
