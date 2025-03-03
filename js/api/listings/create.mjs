import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Creates a new listing by sending a POST request to the API.
 *
 * @param {Object} postData - The data for the new listing.
 * @param {string} postData.title - The title of the listing.
 * @param {string} postData.description - The description of the listing.
 * @param {number} postData.price - The price of the listing.
 * @param {string} postData.endsAt - The end date and time for the listing in ISO format.
 * @returns {Promise<Object|null>} A promise that resolves to the created listing object if successful, or null if an error occurs.
 *
 * @throws {Error} Displays an error message if the request fails due to network issues, client errors, or server errors.
 */
const action = "/listings";
const method = "post";

export async function createListing(postData) {
  const createListingURL = `${API_AUCTION_URL}${action}?_seller=true&_bids=true`;

  try {
    const response = await authFetch(createListingURL, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      if (response.status >= 400 && response.status < 500) {
        console.error("Client error while creating listing:", errorMessage);
        alert(
          "Failed to create listing. Please check your input and try again.",
        );
      } else if (response.status >= 500) {
        console.error("Server error while creating listing:", errorMessage);
        alert(
          "Failed to create listing due to a server error. Please try again later.",
        );
      } else {
        console.error("Unexpected error while creating listing:", errorMessage);
        alert("An unexpected error occurred. Please try again.");
      }
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Network error or unexpected error while creating the listing:",
      error,
    );
    alert(
      "A network error occurred. Please check your internet connection and try again.",
    );
    return null;
  }
}
