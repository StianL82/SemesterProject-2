import { searchListingsFromAPI } from "../api/listings/search.mjs";
import { createCardTemplate } from "../templates/listingCard.mjs";

export async function searchListings(query) {
  try {
    const searchResults = await searchListingsFromAPI(query);
    const listings = searchResults.data || [];

    const container = document.getElementById("listings-container");
    container.innerHTML = "";

    if (listings.length === 0) {
      container.innerHTML = "<p>No listings found matching your search.</p>";
    } else {
      listings.forEach((listing) => {
        const card = createCardTemplate(listing);
        container.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Failed to fetch search results:", error);
    alert("An error occurred while fetching the search results.");
  }
}
