import { handleAddListingForm } from "../components/addListing.mjs";

/**
 * Sets up an event listener for the "Add Listing" form when the DOM is fully loaded.
 * Attaches the `handleAddListingForm` function to the form's submit event.
 */
export function setupAddListingForm() {
  document.addEventListener("DOMContentLoaded", () => {
    const addListingForm = document.getElementById("addListingForm");
    if (addListingForm) {
      addListingForm.addEventListener("submit", handleAddListingForm);
    }
  });
}
