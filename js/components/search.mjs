import { searchListingsFromAPI } from "../api/listings/search.mjs"; // Ny funksjon for søk i API-et
import { createCardTemplate } from "../templates/listingCard.mjs"; // For å generere kortene

export async function searchListings(query) {
  try {
    const searchResults = await searchListingsFromAPI(query); // Kall søkefunksjonen fra API-et
    const listings = searchResults.data || [];

    const container = document.getElementById("listings-container");
    container.innerHTML = ""; // Tøm containeren før nye resultater vises

    if (listings.length === 0) {
      container.innerHTML = "<p>No listings found matching your search.</p>"; // Vise melding hvis ingen treff
    } else {
      listings.forEach((listing) => {
        const card = createCardTemplate(listing);
        container.appendChild(card); // Legg til kortene i containeren
      });
    }
  } catch (error) {
    console.error("Failed to fetch search results:", error);
    alert("An error occurred while fetching the search results.");
  }
}
