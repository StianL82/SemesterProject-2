import { handleAddListingForm } from "../components/addListing.mjs";

export function setupAddListingForm() {
  document.addEventListener("DOMContentLoaded", () => {
    const addListingForm = document.getElementById("addListingForm");
    if (addListingForm) {
      addListingForm.addEventListener("submit", handleAddListingForm);
    }
  });
}
