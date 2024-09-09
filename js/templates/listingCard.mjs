export function createCardTemplate(listingData) {
  const { id, title, media, endsAt } = listingData;

  const cardCol = document.createElement("div");
  cardCol.classList.add("col-12", "col-md-6", "col-lg-3");

  // Lag en lenke som omgir hele kortet
  const link = document.createElement("a");
  link.href = `/listing/index.html?id=${id}`;
  link.classList.add("text-decoration-none", "text-dark"); // Fjern understreking og behold tekstfarge
  cardCol.appendChild(link);

  const card = document.createElement("div");
  card.classList.add("card", "my-3", "border", "border-dark");
  link.appendChild(card);

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header", "bg-light-blue", "text-center");
  card.appendChild(cardHeader);

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "mb-0");
  cardTitle.textContent = title;
  cardHeader.appendChild(cardTitle);

  const cardImage = document.createElement("img");

  // Sjekk om det finnes media-bilder
  if (media && media.length > 0 && media[0].url) {
    // Hvis media finnes, bruk det første bildet
    cardImage.src = media[0].url;
    cardImage.alt = `Listing image of a ${title}`; // Dynamisk alt-tekst for media
  } else {
    // Hvis ikke, bruk et placeholder-bilde
    cardImage.src =
      "https://plus.unsplash.com/premium_photo-1667539633338-5b7afd626193?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    cardImage.alt = "Placeholder image for the listing"; // Placeholder alt-tekst
  }

  // Hvis bildet fra URL-en ikke kan lastes, bytt til ditt eget eksempelbilde
  cardImage.onerror = function () {
    this.src = "/images/example_image.png";
    this.alt = "Placeholder image for the listing";
  };

  cardImage.classList.add("card-img-top");
  card.appendChild(cardImage);

  const cardOverlay = document.createElement("div");
  cardOverlay.classList.add(
    "card-img-overlay",
    "d-flex",
    "flex-column",
    "justify-content-center"
  );
  card.appendChild(cardOverlay);

  const overlayContent = document.createElement("div");
  overlayContent.classList.add("bg-white", "p-2", "shadow-sm");
  overlayContent.style.width = "fit-content";
  cardOverlay.appendChild(overlayContent);

  const expiresLabel = document.createElement("p");
  expiresLabel.classList.add("mb-0");
  expiresLabel.innerHTML = "<strong>Expires:</strong>";
  overlayContent.appendChild(expiresLabel);

  const expiresDate = document.createElement("p");
  expiresDate.classList.add("mb-0");

  if (endsAt) {
    expiresDate.textContent = new Date(endsAt).toLocaleDateString("en-GB");
  } else {
    expiresDate.textContent = "No expiration date";
  }
  overlayContent.appendChild(expiresDate);

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer", "bg-info", "text-center");
  card.appendChild(cardFooter);

  const viewLink = document.createElement("span"); // Endret fra <a> til <span> siden hele kortet nå er en lenke
  viewLink.classList.add("btn", "btn-link");
  viewLink.textContent = "View the listing";
  cardFooter.appendChild(viewLink);

  return cardCol;
}
