import { getAllListings } from "../api/listings/getAllListings.mjs";
import * as components from "/js/components/index.mjs";
import { displayListings } from "../components/displayListings.mjs";

/**
 * Sorts and displays listings based on the selected sorting type.
 *
 * @param {string} [sortType="newestListings"] - The sorting type (e.g., "newestListings", "oldestListings", "Alpha-A-Z", "Alpha-Z-A", "expired").
 * @param {number} [page=1] - The current page number for pagination.
 * @param {boolean} [append=false] - Whether to append new listings or replace existing ones.
 * @returns {Promise<void>} A promise that resolves once the sorted listings are displayed.
 *
 * @throws {Error} Logs an error message if sorting or fetching listings fails.
 */
export let listings = [];
export let currentPage = 1;

export async function sortListings(
  sortType = "newestListings",
  page = 1,
  append = false,
) {
  components.showLoadingIndicator();

  try {
    if (page === 1) {
      listings = (await getAllListings()) || [];
    }

    const now = new Date();
    const sortOptionHeader = document.querySelector(".sortOption");

    let filteredListings = [];
    switch (sortType) {
      case "newestListings":
        sortOptionHeader.textContent = "Listings sorted by most recent";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now,
        );
        filteredListings.sort(
          (a, b) => new Date(b.created) - new Date(a.created),
        );
        break;
      case "oldestListings":
        sortOptionHeader.textContent = "Listings sorted by oldest first";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now,
        );
        filteredListings.sort(
          (a, b) => new Date(a.created) - new Date(b.created),
        );
        break;
      case "Alpha-A-Z":
        sortOptionHeader.textContent =
          "Listings in alphabetical order from A-Z";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now,
        );
        filteredListings.sort((a, b) => a.title.localeCompare(b.title, "nb"));
        break;
      case "Alpha-Z-A":
        sortOptionHeader.textContent =
          "Listings in alphabetical order from Z-A";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now,
        );
        filteredListings.sort((a, b) => b.title.localeCompare(a.title, "nb"));
        break;
      case "expired":
        sortOptionHeader.textContent = "Expired listings";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) < now,
        );
        filteredListings.sort(
          (a, b) => new Date(a.endsAt) - new Date(b.endsAt),
        );
        break;
      default:
        sortOptionHeader.textContent = "Newest listings";
        filteredListings = listings.filter(
          (listing) => new Date(listing.endsAt) > now,
        );
        break;
    }

    displayListings(filteredListings, page, append);

    currentPage = page;
  } catch (error) {
    console.error("Failed to sort listings:", error);
  } finally {
    components.hideLoadingIndicator();
  }
}
