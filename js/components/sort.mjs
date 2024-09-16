import { getAllListings } from "../api/listings/getAllListings.mjs";
import * as components from "/js/components/index.mjs";
import { displayListings } from "../components/displayListings.mjs";

export let listings = [];
export let currentPage = 1;

export async function sortListings(
  sortType = "newestListings",
  page = 1,
  append = false
) {
  components.showLoadingIndicator();

  try {
    // Hvis det er første siden, hent alle listings på nytt
    if (page === 1) {
      listings = (await getAllListings()) || [];
    }

    const now = new Date();
    const sortOptionHeader = document.querySelector(".sortOption");

    // Filter og sorter alltid hele datasettet basert på sortType
    let filteredListings = [];
    switch (sortType) {
      case "newestListings":
        sortOptionHeader.textContent = "Listings sorted by most recent";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now
        );
        filteredListings.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        break;
      case "oldestListings":
        sortOptionHeader.textContent = "Listings sorted by oldest first";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now
        );
        filteredListings.sort(
          (a, b) => new Date(a.created) - new Date(b.created)
        );
        break;
      case "Alpha-A-Z":
        sortOptionHeader.textContent =
          "Listings in alphabetical order from A-Z";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now
        );
        filteredListings.sort((a, b) => a.title.localeCompare(b.title, "nb"));
        break;
      case "Alpha-Z-A":
        sortOptionHeader.textContent =
          "Listings in alphabetical order from Z-A";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now
        );
        filteredListings.sort((a, b) => b.title.localeCompare(a.title, "nb"));
        break;
      case "expired":
        sortOptionHeader.textContent = "Expired listings";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) < now
        );
        filteredListings.sort(
          (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
        );
        break;
      default:
        sortOptionHeader.textContent = "Newest listings";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now
        );
        break;
    }

    // Oppdater displayet med riktig side
    displayListings(filteredListings, page, append);

    currentPage = page;
  } catch (error) {
    console.error("Failed to sort listings:", error);
  } finally {
    components.hideLoadingIndicator();
  }
}
