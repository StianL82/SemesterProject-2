import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";
import { getLoggedInUser } from "/js/components/getLoggedInUser.mjs"; // Importer den nye funksjonen
import { enableImageModal } from "/js/components/openImageModal.mjs"; // Importer den nye funksjonen


// Funksjon for å sende bud
async function placeBid(listingId, bidAmount) {
  const bidUrl = `${API_AUCTION_URL}/listings/${listingId}/bids`;

  try {
    const response = await authFetch(bidUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) {
      throw new Error("Failed to place bid. Make sure your bid is valid.");
    }

    const data = await response.json();
    console.log("Bid successfully placed:", data);
    return data;
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}

// Trinn 1: Hent ID fra URL
function getListingId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Trinn 2: Hent data fra API
async function fetchListingData(id) {
  const listingUrl = `${API_AUCTION_URL}/listings/${id}?_seller=true&_bids=true`;
  try {
    const response = await authFetch(listingUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch listing with ID ${id}`);
    }
    const data = await response.json();
    return data.data; // Returner data-delen av API-responsen
  } catch (error) {
    console.error("Error fetching listing data:", error);
  }
}

// Trinn 3: Oppdater HTML med dynamiske data og legg til budfunksjonalitet
function updatePageWithListingData(listing) {
  const loggedInUser = getLoggedInUser();
  const sellerName = listing.seller.name;

  // Skjul budinput hvis brukeren er eieren
  const bidInputGroup = document.querySelector(".input-group");
  if (loggedInUser && loggedInUser.name === sellerName) {
    bidInputGroup.style.display = "none"; // Skjul bud-feltet for eieren
  }

  // Oppdater tittel
  const titleElement = document.querySelector(".itemTitle");
  titleElement.textContent = listing.title;

  // Oppdater beskrivelse
  const descriptionElement = document.querySelector(".itemDescription");
  descriptionElement.textContent = listing.description;

  // Oppdater hovedbildet
  const mainImage = document.querySelector(".main-listing-image");
  if (listing.media && listing.media.length > 0) {
    mainImage.src = listing.media[0].url;
    mainImage.alt = listing.media[0].alt || `Listing image of ${listing.title}`;
  } else {
    mainImage.src =
      "https://plus.unsplash.com/premium_photo-1667539633338-5b7afd626193?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    mainImage.alt = "Placeholder image for the listing";
  }

  // Oppdater ekstra bilder (legg tilbake denne delen)
  const extraImageContainer = document.querySelector(".extraImageContainer");
  extraImageContainer.innerHTML = ""; // Tøm containeren før du legger til nye elementer

  if (listing.media && listing.media.length > 1) {
    // Start fra index 1, fordi index 0 allerede er brukt som hovedbilde
    for (let i = 1; i < listing.media.length && i <= 3; i++) {
      const mediaItem = listing.media[i];

      const extraImageDiv = document.createElement("div");
      extraImageDiv.classList.add("p-2", "col-12", "col-sm-4");

      const img = document.createElement("img");
      img.src = mediaItem.url;
      img.alt = mediaItem.alt || `Extra Image ${i}`;
      img.classList.add("img-fluid", "rounded");

      extraImageDiv.appendChild(img);
      extraImageContainer.appendChild(extraImageDiv);
    }
  } else {
    const noImagesMessage = document.createElement("p");
    noImagesMessage.textContent = "No additional images available.";
    extraImageContainer.appendChild(noImagesMessage);
  }

    // Aktiver bildeklikk for modal
    enableImageModal(listing);

  // Finn høyeste bud
  let highestBid = 0;
  let highestBidder = null; // Variabel for å lagre høyeste budgiver
  if (listing.bids && listing.bids.length > 0) {
    highestBid = Math.max(...listing.bids.map((bid) => bid.amount)); // Finner høyeste bud
    highestBidder = listing.bids.find((bid) => bid.amount === highestBid)
      ?.bidder.name; // Finn høyeste budgiver
  }

  // Oppdater budhistorikk
  const bidHistoryContainer = document.querySelector(".bidHistoryContainer");
  bidHistoryContainer.innerHTML = ""; // Tøm containeren før du legger til nye elementer

  if (listing.bids && listing.bids.length > 0) {
    listing.bids.forEach((bid) => {
      const bidElement = document.createElement("div");
      bidElement.classList.add("d-flex", "justify-content-around", "mb-2");

      const bidderSpan = document.createElement("span");
      bidderSpan.classList.add("bidder");
      bidderSpan.textContent = bid.bidder.name;

      const amountSpan = document.createElement("span");
      amountSpan.classList.add("bidAmount");
      amountSpan.textContent = bid.amount;

      bidElement.appendChild(bidderSpan);
      bidElement.appendChild(amountSpan);

      bidHistoryContainer.appendChild(bidElement);
    });
  } else {
    const noBidsMessage = document.createElement("p");
    noBidsMessage.textContent = "No bids yet.";
    bidHistoryContainer.appendChild(noBidsMessage);
  }

  // Lytt etter budknappen
  const bidButton = document.querySelector(".btn-bid");
  bidButton.addEventListener("click", async () => {
    const bidInput = document.querySelector("#bidInput").value;
    const bidAmount = parseFloat(bidInput);

    if (isNaN(bidAmount) || bidAmount <= highestBid) {
      alert(
        `Bid must be higher than the current highest bid of ${highestBid}.`
      );
      return;
    }

    // Sjekk om brukeren allerede har det høyeste budet
    if (loggedInUser && highestBidder === loggedInUser.name) {
      // Vis en modal for å bekrefte om brukeren vil gi nytt bud
      const modalElement = document.getElementById("bidConfirmationModal");
      const modalBody = modalElement.querySelector(".modal-body");
      modalBody.textContent = `You already have the highest bid of ${highestBid}. Do you still want to place a higher bid?`;

      // Åpne modal
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();

      // Lytt til "Confirm"-knappen
      const confirmButton = modalElement.querySelector(".btn-confirm");
      confirmButton.addEventListener("click", async () => {
        bootstrapModal.hide();

        // Send bud etter bekreftelse
        try {
          await placeBid(listing.id, bidAmount);
          alert("Your bid was placed successfully!");
          location.reload(); // Oppdater siden etter suksess
        } catch (error) {
          alert("Failed to place bid. Please try again.");
        }
      });

      // Hvis brukeren trykker "Cancel", gjør ingenting
      return;
    }

    try {
      // Send bud
      await placeBid(listing.id, bidAmount);
      alert("Your bid was placed successfully!");
      location.reload(); // Oppdater siden etter suksess
    } catch (error) {
      alert("Failed to place bid. Please try again.");
    }
  });
}

// Kjør funksjonene for å hente data og oppdatere siden
export async function initListingPage() {
  const listingId = getListingId();
  if (listingId) {
    const listingData = await fetchListingData(listingId);
    if (listingData) {
      updatePageWithListingData(listingData);
    }
  } else {
    console.error("No listing ID found in URL.");
  }
}
