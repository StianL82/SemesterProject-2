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
    
    if (creditsElement) {
      const strongCredits = document.createElement("strong");
      strongCredits.textContent = "My Credits: ";
      creditsElement.appendChild(strongCredits);
      creditsElement.append(data.credits); // Legg til dynamisk verdi
    }
    
    if (emailElement) {
      const strongEmail = document.createElement("strong");
      strongEmail.textContent = "E-mail: ";
      emailElement.appendChild(strongEmail);
      emailElement.append(data.email); // Legg til dynamisk verdi
    }
    
    if (usernameElement) {
      const strongUsername = document.createElement("strong");
      strongUsername.textContent = "Username: ";
      usernameElement.appendChild(strongUsername);
      usernameElement.append(data.name); // Legg til dynamisk verdi
    }
    

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
