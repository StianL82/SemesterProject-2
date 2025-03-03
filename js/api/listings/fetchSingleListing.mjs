import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Fetches listing data from the API for a given listing ID.
 *
 * @param {string} id - The unique identifier of the listing.
 * @returns {Promise<Object>} A promise that resolves to the listing data, including seller and bid information.
 *
 * @throws {Error} Throws an error if the request fails due to network issues, client errors, or server errors.
 */
export async function fetchListingData(id) {
  const listingUrl = `${API_AUCTION_URL}/listings/${id}?_seller=true&_bids=true`;

  try {
    const response = await authFetch(listingUrl);

    if (!response.ok) {
      const errorMessage = await response.text();

      if (response.status >= 400 && response.status < 500) {
        console.error(`Client error: ${errorMessage}`);
        throw new Error(
          `Failed to fetch listing due to a client error: ${errorMessage}`,
        );
      } else if (response.status >= 500) {
        console.error(`Server error: ${errorMessage}`);
        throw new Error(
          `Failed to fetch listing due to a server error. Please try again later.`,
        );
      } else {
        throw new Error(`Unexpected error: ${errorMessage}`);
      }
    }

    return (await response.json()).data;
  } catch (error) {
    console.error("Error fetching listing data:", error);
    throw error;
  }
}
