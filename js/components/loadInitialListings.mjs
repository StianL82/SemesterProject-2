import * as components from "/js/components/index.mjs";

/**
 * Loads the initial listings by sorting them as "newestListings".
 * Displays a loading indicator while fetching data and hides it afterward.
 *
 * @returns {Promise<void>} A promise that resolves once the listings are loaded.
 *
 * @throws {Error} Logs an error message if loading the listings fails.
 */
export async function loadInitialListings() {
  components.showLoadingIndicator();

  try {
    await components.sortListings("newestListings");
  } catch (error) {
    console.error("Failed to load initial listings:", error);
  } finally {
    components.hideLoadingIndicator();
  }
}
