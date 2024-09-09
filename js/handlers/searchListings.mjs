import { searchListings } from "../components/search.mjs";

let debounceTimer;

export function setupSearchListener() {
  const searchInput = document.querySelector("#searchInput");

  // Tøm søkefeltet ved første oppstart
  searchInput.value = "";

  searchInput.addEventListener("input", (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = event.target.value;
      if (query.length > 0) {
        searchListings(query); // Utfør søk med inputverdien
      } else {
        location.reload(); // Hvis feltet tømmes, last siden på nytt for å vise standard oppføringer
      }
    }, 1000); // Vent 1 sekund før søket utføres
  });
}
