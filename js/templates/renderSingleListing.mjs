import { API_AUCTION_URL } from "/js/api/constants.mjs";
import { authFetch } from "/js/api/authFetch.mjs";

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

// Trinn 3: Oppdater HTML med dynamiske data
function updatePageWithListingData(listing) {
  // Oppdater tittel
  const titleElement = document.querySelector(".itemTitle");
  titleElement.textContent = listing.title;

  // Oppdater beskrivelse
  const descriptionElement = document.querySelector(".itemDescription");
  descriptionElement.textContent = listing.description;

  // Oppdater hovedbildet
  const mainImage = document.querySelector(".main-listing-image"); // Bruk en stabil klasse for å finne bildet
  if (listing.media && listing.media.length > 0) {
    mainImage.src = listing.media[0].url;
    mainImage.alt = listing.media[0].alt || `Listing image of ${listing.title}`; // Sett alt-teksten dynamisk
  } else {
    mainImage.src =
      "https://plus.unsplash.com/premium_photo-1667539633338-5b7afd626193?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Hvis det ikke er noe media, bruk et eksempelbilde
    mainImage.alt = "Placeholder image for the listing";
  }

  // Oppdater ekstra bilder
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

  // Oppdater selgerens navn
  const sellerElement = document.querySelector(".seller");
  if (listing.seller && listing.seller.name) {
    sellerElement.textContent = listing.seller.name;
  } else {
    sellerElement.textContent = "Unknown seller";
  }

  // Oppdater utløpsdato
  const endsAtElement = document.querySelector(".expires");
  if (listing.endsAt) {
    const endsAtDate = new Date(listing.endsAt).toLocaleDateString("en-GB");
    endsAtElement.textContent = endsAtDate;
  }

  // Oppdater budhistorikk (Eksempel for ett bud)
  const numberOfBids = document.querySelector(".BidNumber");
  numberOfBids.textContent = `Number of bids: ${listing._count.bids}`;

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

  // Legg til eventuelle flere dataoppdateringer her
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
