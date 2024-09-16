import { sortListings, currentPage } from "../components/sort.mjs";

export function loadMoreListings(sortType) {
  sortListings(sortType, currentPage + 1, true);
}
