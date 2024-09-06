// Importer createListing-funksjonen fra en annen modul
import { createListing } from "/js/api/listings/create.mjs";

// Funksjon for å håndtere skjema-sendingen
export async function handleAddListingForm(event) {
  event.preventDefault(); // Forhindrer tradisjonell skjema-sending

  // Hent data fra skjemaet
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const endsAt = document.getElementById("expiresAt").value;
  const media = [
    {
      url: document.getElementById("media").value,
      alt: document.getElementById("mediaAlt").value || "", // Bruk tom string hvis ingen alt-tekst
    },
  ];

  // Hent data fra de ekstra media-feltene hvis de er utfylt
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

  // Bygg objektet som skal sendes til API-et
  const postData = {
    title,
    description, // Kan være tom
    media, // Inneholder minst ett bilde, og opptil 3 ekstra hvis de er angitt
    endsAt: new Date(endsAt).toISOString(), // Konverter datoen til riktig ISO-format
  };

  try {
    // Kall funksjonen som sender data til API-et
    const response = await createListing(postData);

    if (response) {
      // Vellykket, lukk modalen og vis en suksessmelding
      const modalElement = document.getElementById("addListingModal");
      const modal = bootstrap.Modal.getInstance(modalElement); // Hent instansen av modalen
      modal.hide(); // Lukk modalen

      // Vis en suksessmelding
      alert("Listing created successfully");
    }
  } catch (error) {
    console.error("Failed to create listing:", error);
    alert("An error occurred while creating the listing.");
  }
}

// Funksjon for å legge til event listener på skjemaet
export function setupAddListingForm() {
  document.addEventListener("DOMContentLoaded", () => {
    const addListingForm = document.getElementById("addListingForm");
    if (addListingForm) {
      addListingForm.addEventListener("submit", handleAddListingForm);
    }
  });
}
