import { sortListings, currentPage } from "../components/sort.mjs";

/**
 * Loads more listings by fetching the next page of sorted listings.
 * Uses the current sorting type from the sort dropdown or defaults to "newestListings".
 */
export function loadMoreListings() {
  const sortByElement = document.getElementById("sortBy");
  const currentSortType = sortByElement
    ? sortByElement.value
    : "newestListings";

  sortListings(currentSortType, currentPage + 1, true);
}
