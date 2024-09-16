import { sortListings, currentPage } from "../components/sort.mjs";

export function loadMoreListings() {
  const sortByElement = document.getElementById('sortBy');
  const currentSortType = sortByElement ? sortByElement.value : "newestListings";

  sortListings(currentSortType, currentPage + 1, true);
}

