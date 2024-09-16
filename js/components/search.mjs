import { searchListingsFromAPI } from "../api/listings/search.mjs";
import { createCardTemplate } from "../templates/listingCard.mjs";

export async function searchListings(query) {
  try {
    const searchResults = await searchListingsFromAPI(query);
    
    if (!searchResults) return;

    const listings = searchResults.data || [];
    const container = document.getElementById("listings-container");
    container.innerHTML = "";

    const loadMoreBtn = document.querySelector("#loadMoreBtn");
    loadMoreBtn.style.display = "none";

    if (listings.length === 0) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "No listings found matching your search.";
      noResultsMessage.classList.add("my-5", "text-center");
      container.appendChild(noResultsMessage);
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

