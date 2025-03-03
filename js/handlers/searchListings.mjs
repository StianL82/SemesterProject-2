import { searchListings } from "../components/search.mjs";

/**
 * Sets up an event listener for the search input field.
 * Implements a debounce mechanism to delay search execution until the user stops typing.
 * Triggers a search request if the query is not empty; otherwise, reloads the page.
 */
let debounceTimer;

export function setupSearchListener() {
  const searchInput = document.querySelector("#searchInput");

  searchInput.value = "";

  searchInput.addEventListener("input", (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = event.target.value;
      if (query.length > 0) {
        searchListings(query);
      } else {
        location.reload();
      }
    }, 1000);
  });
}
