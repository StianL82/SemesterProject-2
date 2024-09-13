import { API_AUCTION_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";

export async function getAllListings() {
  let listings = [];
  let currentPage = 1;
  const limit = 100;
  let moreData = true;

  try {
    while (moreData) {
      const getListingsURL = `${API_AUCTION_URL}${action}?_seller=true&_bids=true&limit=${limit}&page=${currentPage}`;

      const response = await authFetch(getListingsURL);

      if (!response.ok) {
        const errorMessage = await response.text();

        if (response.status >= 400 && response.status < 500) {
          console.error("Client error while fetching listings:", errorMessage);
          alert(
            "Failed to fetch listings. Please check your input and try again."
          );
        } else if (response.status >= 500) {
          console.error("Server error while fetching listings:", errorMessage);
          alert(
            "Failed to fetch listings due to server error. Please try again later."
          );
        } else {
          console.error(
            "Unexpected error while fetching listings:",
            errorMessage
          );
          alert(
            "An unexpected error occurred while fetching listings. Please try again."
          );
        }
        return null;
      }

      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        listings = listings.concat(data.data);
        currentPage++;
      } else {
        moreData = false;
      }
    }

    return listings;
  } catch (error) {
    console.error(
      "Network error or unexpected error while fetching all listings:",
      error
    );
    alert(
      "A network error occurred. Please check your internet connection and try again."
    );
    return null;
  }
}
