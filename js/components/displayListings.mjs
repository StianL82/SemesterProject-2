import { createCardTemplate } from "../templates/listingCard.mjs";

/**
 * Displays a paginated list of listings inside the container element.
 *
 * @param {Array<Object>} sortedListings - An array of sorted listing objects to display.
 * @param {number} [page=1] - The current page number.
 * @param {boolean} [append=false] - Whether to append new listings or replace existing ones.
 */
export function displayListings(sortedListings, page = 1, append = false) {
  const container = document.getElementById("listings-container");

  if (!append) {
    container.innerHTML = "";
  }

  const listingsPerPage = 20;
  const start = (page - 1) * listingsPerPage;
  const end = start + listingsPerPage;
  const listingsToShow = sortedListings.slice(start, end);

  listingsToShow.forEach((listing) => {
    const card = createCardTemplate(listing);
    container.appendChild(card);
  });

  const loadMoreBtn = document.querySelector("#loadMoreBtn");
  if (end >= sortedListings.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}
