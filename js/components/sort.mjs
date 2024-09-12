import { getAllListings } from "../api/listings/getAllListings.mjs";
import { createCardTemplate } from "../templates/listingCard.mjs";
import * as components from "/js/components/index.mjs";

let listings = [];
let currentPage = 1;
const listingsPerPage = 20;

export async function displayListings(page = 1, append = false) {
  const container = document.getElementById("listings-container");

  if (!append) {
    container.innerHTML = "";
  }

  const start = (page - 1) * listingsPerPage;
  const end = start + listingsPerPage;
  const listingsToShow = listings.slice(start, end);

  listingsToShow.forEach((listing) => {
    const card = createCardTemplate(listing);
    container.appendChild(card);
  });

  const loadMoreBtn = document.querySelector("#loadMoreBtn");
  if (end >= listings.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

export async function sortListings(sortType = "newestListings") {
  components.showLoadingIndicator();

  try {
    listings = await getAllListings();

    const now = new Date();
    const sortOptionHeader = document.querySelector(".sortOption");

    switch (sortType) {
      case "newestListings":
        sortOptionHeader.textContent = "Listings sorted by most recent";
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        listings.sort((a, b) => new Date(b.created) - new Date(a.created));
        break;
      case "oldestListings":
        sortOptionHeader.textContent = "Listings sorted by oldest first";
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        listings.sort((a, b) => new Date(a.created) - new Date(b.created));
        break;
      case "Alpha-A-Z":
        sortOptionHeader.textContent = "Listings in alphabetical order from A-Z";
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        listings.sort((a, b) => a.title.localeCompare(b.title, "nb"));
        break;
      case "Alpha-Z-A":
        sortOptionHeader.textContent = "Listings in alphabetical order from Z-A";
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        listings.sort((a, b) => b.title.localeCompare(a.title, "nb"));
        break;
      case "expired":
        sortOptionHeader.textContent = "Expired listings";
        listings = listings.filter((listing) => new Date(listing.endsAt) < now);
        listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
        break;
      default:
        sortOptionHeader.textContent = "Newest listings";
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        break;
    }

    currentPage = 1;
    displayListings(currentPage, false);
  } catch (error) {
    console.error("Failed to sort listings:", error);
  } finally {
    components.hideLoadingIndicator();
  }
}

export function loadMoreListings() {
  currentPage += 1;
  displayListings(currentPage, true);
}

export async function loadInitialListings() {
  components.showLoadingIndicator();

  try {
    await sortListings("newestListings");
  } catch (error) {
    console.error("Failed to load initial listings:", error);
  } finally {
    components.hideLoadingIndicator();
  }
}


