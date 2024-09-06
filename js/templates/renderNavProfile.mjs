import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs";
import { authFetch } from "/js/api/authFetch.mjs";

// Funksjon for å oppdatere nav-bar med brukerens avatar og kreditter
export async function renderNavProfile() {
  const user = getLoggedInUser();

  if (!user) {
    console.error("No logged-in user found.");
    return;
  }

  try {
    const profileUrl = `${API_AUCTION_URL}/profiles/${user.name}`;
    const response = await authFetch(profileUrl);
    const { data } = await response.json();

    // Hent container der avatar og credits skal legges til
    const profileContainer = document.getElementById("navProfileContainer");
    if (!profileContainer) {
      console.error("No container found for nav profile.");
      return;
    }

    // Opprett en a-tag for å lenke til profilsiden
    const avatarLink = document.createElement("a");
    avatarLink.href = "/profile/index.html";
    avatarLink.setAttribute("role", "button");
    avatarLink.setAttribute("aria-expanded", "false");

    // Opprett avatarbilde-elementet inne i a-taggen
    const avatarElement = document.createElement("img");
    avatarElement.classList.add("userAvatar", "navAvatar", "rounded-circle", "mb-1");
    avatarElement.alt = "The profile image of the logged in user";
    avatarElement.src = data.avatar?.url || "/images/navAvatar.png"; // Bruk avatar fra API eller fallback

    // Legg avatarbilde inn i a-taggen
    avatarLink.appendChild(avatarElement);

    // Opprett kreditt-informasjons-elementet
    const creditsElement = document.createElement("span");
    creditsElement.classList.add("text-white");
    creditsElement.textContent = `${data.credits} Credits`;

    // Legg til a-taggen med avatar og kreditt-informasjon i containeren
    profileContainer.appendChild(avatarLink);
    profileContainer.appendChild(creditsElement);
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
}

