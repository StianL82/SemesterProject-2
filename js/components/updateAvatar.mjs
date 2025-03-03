import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";

/**
 * Updates the logged-in user's avatar by sending a PUT request to the API.
 * Validates the input to ensure it is a valid URL before updating.
 *
 * @returns {Promise<void>} A promise that resolves once the avatar update is completed.
 *
 * @throws {Error} Displays an alert if the avatar update fails.
 */
export async function updateAvatar() {
  const loggedInUser = getLoggedInUser();

  if (!loggedInUser) {
    console.error("No logged-in user found.");
    return;
  }

  const avatarInput = document.querySelector("input.form-control").value.trim();

  if (!avatarInput || !avatarInput.startsWith("http")) {
    alert("Please enter a valid avatar URL.");
    return;
  }

  const updateUrl = `${API_AUCTION_URL}/profiles/${loggedInUser.name}`;

  const avatarData = {
    avatar: {
      url: avatarInput,
    },
  };

  try {
    const response = await authFetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatarData),
    });

    if (!response.ok) {
      throw new Error("Failed to update avatar. Please try again.");
    }

    alert("Avatar updated successfully!");

    const avatarElement = document.querySelector(".profile-avatar");
    avatarElement.src = avatarInput;

    document.querySelector("input.form-control").value = "";
  } catch (error) {
    console.error("Error updating avatar:", error);
    alert("Error updating avatar. Please try again.");
  }
}

/**
 * Sets up an event listener for the avatar update button when the DOM is fully loaded.
 */
document.addEventListener("DOMContentLoaded", function () {
  const updateButton = document.querySelector(".updateAvatarButton");
  if (updateButton) {
    updateButton.addEventListener("click", function (event) {
      event.preventDefault();
      updateAvatar();
    });
  }
});
