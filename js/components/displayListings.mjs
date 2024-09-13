import { createCardTemplate } from "../templates/listingCard.mjs";

export let listings = [];
let listingsPerPage = 20;

export function displayListings(listings, page = 1, append = false) {
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

