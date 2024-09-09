import { searchListings } from "../components/search.mjs";

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
