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
    console.error("An error occurred while fetching all listings:", error);
    throw error;
  }
}

