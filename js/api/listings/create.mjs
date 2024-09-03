import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

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
      console.error(
        "Failed to create listing: Server responded with status",
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while creating the listing:", error);
    throw error;
  }
}