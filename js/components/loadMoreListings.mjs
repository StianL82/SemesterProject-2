import * as components from "/js/components/index.mjs";

export let currentPage = 1;

export function loadMoreListings(listings) {
  currentPage += 1;
  components.displayListings(listings, currentPage, true);
}