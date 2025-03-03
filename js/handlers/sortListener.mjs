import { sortListings } from "../components/sort.mjs";

/**
 * Sets up an event listener for the sorting dropdown on the index page.
 * Initializes sorting to "newestListings" on page load and updates listings when the user changes the sorting option.
 */
export function setupSortListener() {
  document.addEventListener("DOMContentLoaded", () => {
    const sortBy = document.getElementById("sortBy");

    const isIndexPage =
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("/index.html");

    if (isIndexPage && sortBy) {
      sortBy.value = "newestListings";

      sortListings(sortBy.value);

      sortBy.addEventListener("change", () => {
        sortListings(sortBy.value);
      });
    } else {
      console.error("Sort by element not found.");
    }
  });
}
