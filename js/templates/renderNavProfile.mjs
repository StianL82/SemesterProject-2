import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";
import { authFetch } from "/js/api/authFetch.mjs";

export async function renderNavProfile() {
  const user = getLoggedInUser();

  if (!user) {
    return;
  }

  const profileContainer = document.getElementById("navProfileContainer");
  if (!profileContainer) {
    console.error("No container found for nav profile.");
    return;
  }

  const avatarLink = document.createElement("a");
  avatarLink.href = "/profile/index.html";
  avatarLink.setAttribute("role", "button");
  avatarLink.setAttribute("aria-expanded", "false");

  const avatarElement = document.createElement("img");
  avatarElement.classList.add(
    "userAvatar",
    "navAvatar",
    "rounded-circle",
    "mb-1"
  );
  avatarElement.alt = "The profile image of the logged-in user";
  avatarElement.title = "Profile Page";

  avatarElement.style.visibility = "hidden";

  avatarElement.onload = () => {
    avatarElement.style.visibility = "visible";
  };

  avatarLink.appendChild(avatarElement);
  profileContainer.appendChild(avatarLink);

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
        throw new Error("We're experiencing server issues. Please try again later.");
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }

    const { data } = await response.json();

    if (data.avatar?.url) {
      avatarElement.src = data.avatar.url;
    } else {
      avatarElement.src = "/images/exampleAvatar.png";
      avatarElement.style.visibility = "visible";
    }

    const creditsElement = document.createElement("span");
    creditsElement.classList.add("text-white");
    creditsElement.textContent = `${data.credits} Credits`;
    profileContainer.appendChild(creditsElement);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    avatarElement.src = "/images/exampleAvatar.png";
    avatarElement.style.visibility = "visible";
  }
}

