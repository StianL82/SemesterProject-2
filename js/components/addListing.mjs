import { createListing } from "/js/api/listings/create.mjs";

/**
 * Handles the submission of the "Add Listing" form.
 *
 * @param {Event} event - The form submit event.
 * @returns {Promise<void>} No return value, but creates a new listing and updates the UI on success.
 *
 * @throws {Error} Displays an error message if the listing creation fails due to network issues, client errors, or server errors.
 */
export async function handleAddListingForm(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  let endsAt = document.getElementById("expiresAt").value;
  const currentDate = new Date().toISOString().split("T")[0];
  if (endsAt === currentDate) {
    endsAt += "T23:59:59";
  }
  const media = [
    {
      url: document.getElementById("media").value,
      alt: document.getElementById("mediaAlt").value || "",
    },
  ];

  const extraMedia1 = document.getElementById("extraMedia1").value;
  const extraMediaAlt1 = document.getElementById("extraMediaAlt1").value;
  if (extraMedia1) {
    media.push({
      url: extraMedia1,
      alt: extraMediaAlt1 || "",
    });
  }

  const extraMedia2 = document.getElementById("extraMedia2").value;
  const extraMediaAlt2 = document.getElementById("extraMediaAlt2").value;
  if (extraMedia2) {
    media.push({
      url: extraMedia2,
      alt: extraMediaAlt2 || "",
    });
  }

  const extraMedia3 = document.getElementById("extraMedia3").value;
  const extraMediaAlt3 = document.getElementById("extraMediaAlt3").value;
  if (extraMedia3) {
    media.push({
      url: extraMedia3,
      alt: extraMediaAlt3 || "",
    });
  }

  const postData = {
    title,
    description,
    media,
    endsAt: new Date(endsAt).toISOString(),
  };

  try {
    const response = await createListing(postData);

    if (response) {
      const modalElement = document.getElementById("addListingModal");
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();

      alert("Listing created successfully");
      window.location.reload();
    }
  } catch (error) {
    console.error("Failed to create listing:", error);

    if (error.response) {
      const errorMessage = await error.response.text();
      if (error.response.status >= 400 && error.response.status < 500) {
        alert(
          `Failed to create listing: ${errorMessage}. Please check your input and try again.`,
        );
      } else if (error.response.status >= 500) {
        alert(
          `Failed to create listing: ${errorMessage}. Please try again later.`,
        );
      } else {
        alert(
          `An unexpected error occurred: ${errorMessage}. Please try again.`,
        );
      }
    } else {
      alert(
        "A network error occurred. Please check your connection and try again.",
      );
    }
  }
}

/**
 * Sets up event listeners for the "Add Listing" form when the DOM is fully loaded.
 */

export function setupAddListingForm() {
  document.addEventListener("DOMContentLoaded", () => {
    const addListingForm = document.getElementById("addListingForm");
    if (addListingForm) {
      addListingForm.addEventListener("submit", handleAddListingForm);
    }
  });
}
