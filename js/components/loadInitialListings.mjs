import * as components from "/js/components/index.mjs";

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
