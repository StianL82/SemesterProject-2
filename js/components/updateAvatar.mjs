import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs"; // Hent informasjon om innlogget bruker

export async function updateAvatar() {
  const loggedInUser = getLoggedInUser(); // Hent innlogget bruker

  if (!loggedInUser) {
    console.error("No logged-in user found.");
    return;
  }

  const avatarInput = document.querySelector("input.form-control").value.trim(); // Hent URL fra input-feltet

  // Sjekk at URL er gyldig når knappen trykkes
  if (!avatarInput || !avatarInput.startsWith("http")) {
    alert("Please enter a valid avatar URL.");
    return;
  }

  const updateUrl = `${API_AUCTION_URL}/profiles/${loggedInUser.name}`; // Bygg URL for å oppdatere brukerens profil

  const avatarData = {
    avatar: {
      url: avatarInput, // URL fra input-feltet
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

    // Hvis oppdateringen er vellykket, vis en melding
    alert("Avatar updated successfully!");

    // Oppdater avatar-bildet på siden uten å måtte laste den inn på nytt
    const avatarElement = document.querySelector(".profile-avatar");
    avatarElement.src = avatarInput; // Oppdaterer bildet på siden

    // Tøm input-feltet etter oppdatering
    document.querySelector("input.form-control").value = "";
  } catch (error) {
    console.error("Error updating avatar:", error);
    alert("Error updating avatar. Please try again.");
  }
}

// Legg til event listener ETTER at hele DOM er lastet inn
document.addEventListener("DOMContentLoaded", function () {
  const updateButton = document.querySelector(".btn-primary"); // Finn "Update Avatar"-knappen
  if (updateButton) {
    updateButton.addEventListener("click", function (event) {
      event.preventDefault(); // Forhindre at knappen sender skjemaet
      updateAvatar(); // Kall updateAvatar-funksjonen
    });
  }
});


