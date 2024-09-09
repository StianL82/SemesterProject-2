import { getAllListings } from "../api/listings/getAllListings.mjs";
import { createCardTemplate } from "../templates/listingCard.mjs";

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
  try {
    listings = await getAllListings();

    const now = new Date();
    switch (sortType) {
      case "newestListings":
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        listings.sort((a, b) => new Date(b.created) - new Date(a.created));
        break;
      case "oldestListings":
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        listings.sort((a, b) => new Date(a.created) - new Date(b.created));
        break;
      case "Alpha-A-Z":
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        listings.sort((a, b) => a.title.localeCompare(b.title, "nb"));
        break;
      case "Alpha-Z-A":
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        listings.sort((a, b) => b.title.localeCompare(a.title, "nb"));
        break;
      case "expired":
        listings = listings.filter((listing) => new Date(listing.endsAt) < now);
        listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
        break;
      default:
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        break;
    }

    currentPage = 1;
    displayListings(currentPage, false);
  } catch (error) {
    console.error("Failed to sort listings:", error);
  }
}

export function loadMoreListings() {
  currentPage += 1;
  displayListings(currentPage, true);
}

export async function loadInitialListings() {
  await sortListings("newestListings");
}
