import { getAllListings } from "/js/api/listings/getAllListings.mjs";
import { createCardTemplate } from "/js/templates/listingCard.mjs";
import * as components from "/js/components/index.mjs";

let currentPage = 1;
const listingsPerPage = 20;
let allListingsLoaded = false;

export async function displayListings(page = 1, append = false) {
  try {
    const listingsResponse = await getAllListings(listingsPerPage, page);
    const listings = listingsResponse.data || [];

    const container = document.getElementById("listings-container");

    if (!append) {
      container.innerHTML = "";
    }

    listings.forEach((listing) => {
      const card = createCardTemplate(listing);
      container.appendChild(card);
    });

    if (listings.length < listingsPerPage) {
      allListingsLoaded = true;
      document.querySelector("#loadMoreBtn").style.display = "none";
    }
  } catch (error) {
    console.error("Failed to display listings:", error);

    const errorMessage = components.displayError(
      "We are having trouble fetching the listings from the API"
    );
    const container = document.getElementById("listings-container");

    container.innerHTML = "";
    container.appendChild(errorMessage);

    const loadMoreBtn = document.querySelector("#loadMoreBtn");
    if (loadMoreBtn) {
      loadMoreBtn.style.display = "none";
    }
  } finally {
  }
}

function loadMoreListings() {
  if (!allListingsLoaded) {
    currentPage += 1;
    displayListings(currentPage, true);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loadMoreBtn = document.querySelector("#loadMoreBtn");
  const listingsContainer = document.getElementById("listings-container");

  if (listingsContainer) {
    displayListings();

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", loadMoreListings);
    }
  }
});

