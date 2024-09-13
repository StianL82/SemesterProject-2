import { getAllListings } from "../api/listings/getAllListings.mjs";
import * as components from "/js/components/index.mjs";

export let listings = [];
export let currentPage = 1;

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
        sortOptionHeader.textContent =
          "Listings in alphabetical order from A-Z";
        listings = listings.filter((listing) => new Date(listing.endsAt) > now);
        listings.sort((a, b) => a.title.localeCompare(b.title, "nb"));
        break;
      case "Alpha-Z-A":
        sortOptionHeader.textContent =
          "Listings in alphabetical order from Z-A";
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
    components.displayListings(listings, currentPage, false);
  } catch (error) {
    console.error("Failed to sort listings:", error);
  } finally {
    components.hideLoadingIndicator();
  }
}
