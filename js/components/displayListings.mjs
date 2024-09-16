import { createCardTemplate } from "../templates/listingCard.mjs";

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
