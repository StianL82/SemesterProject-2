import { getListings } from "/js/api/listings/getListings.mjs";
import { createCardTemplate } from "/js/templates/listingCard.mjs";

let currentPage = 1;
const listingsPerPage = 20;
let allListingsLoaded = false; // Sjekker om alle lister er lastet

export async function displayListings(page = 1, append = false) {
  try {
    const listingsResponse = await getListings(listingsPerPage, page);
    const listings = listingsResponse.data || [];

    const container = document.getElementById("listings-container");

    if (!append) {
      container.innerHTML = ""; // Tøm containeren hvis vi ikke legger til flere
    }

    listings.forEach((listing) => {
      const card = createCardTemplate(listing);
      container.appendChild(card);
    });

    // Sjekk om det er færre enn 20 elementer; hvis ja, skjul "Load More"-knappen
    if (listings.length < listingsPerPage) {
      allListingsLoaded = true; // Ikke vis "Load More"-knappen hvis alt er lastet
      document.querySelector("#loadMoreBtn").style.display = "none"; // Skjul knappen
    }
  } catch (error) {
    console.error("Failed to display listings:", error);
  }
}

function loadMoreListings() {
  if (!allListingsLoaded) {
    currentPage += 1; // Øk sidenummeret
    displayListings(currentPage, true); // append = true for å legge til nye annonser
  }
}

// Eventlistener for "Load More"-knappen
document.addEventListener("DOMContentLoaded", () => {
  const loadMoreBtn = document.querySelector("#loadMoreBtn");
  const listingsContainer = document.getElementById("listings-container");

  if (listingsContainer) {
    // Last første siden ved oppstart bare hvis "listings-container" eksisterer
    displayListings();
    
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", loadMoreListings);
    }
  }
});
