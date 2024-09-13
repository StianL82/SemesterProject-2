import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";
import { authFetch } from "/js/api/authFetch.mjs";

export async function renderProfileInformation() {
  const user = getLoggedInUser();

  if (!user) {
    console.error("No logged-in user found.");
    return;
  }

  try {
    const profileUrl = `${API_AUCTION_URL}/profiles/${user.name}`;
    const response = await authFetch(profileUrl);

    if (!response.ok) {
      const errorMessage = await response.text();
      if (response.status >= 400 && response.status < 500) {
        console.error("Client error:", errorMessage);
        throw new Error(
          "Failed to fetch profile information. Please check your input and try again."
        );
      } else if (response.status >= 500) {
        console.error("Server error:", errorMessage);
        throw new Error(
          "We're experiencing server issues. Please try again later."
        );
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }

    const { data } = await response.json();

    const creditsElement = document.querySelector(".profile-credits");
    const emailElement = document.querySelector(".profile-email");
    const usernameElement = document.querySelector(".profile-username");

    if (creditsElement)
      creditsElement.textContent = `My Credits: ${data.credits}`;
    if (emailElement) emailElement.textContent = `E-mail: ${data.email}`;
    if (usernameElement) usernameElement.textContent = `Username: ${data.name}`;

    const avatarElement = document.querySelector(".profile-avatar");
    avatarElement.style.visibility = "hidden";

    avatarElement.onload = () => {
      avatarElement.style.visibility = "visible";
    };

    if (data.avatar && data.avatar.url) {
      avatarElement.src = data.avatar.url;
    } else {
      avatarElement.src = "/images/profile_avatar_example.png";
      avatarElement.style.visibility = "visible";
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);

    const avatarElement = document.querySelector(".profile-avatar");
    avatarElement.src = "/images/profile_avatar_example.png";
    avatarElement.style.visibility = "visible";
  }
}
