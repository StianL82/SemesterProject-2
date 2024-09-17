import { calculateTimeLeft } from "/js/components/calculateTimeLeft.mjs";

export function createCarouselCard(listing) {
  const { id, title, media, endsAt } = listing;
  const daysLeft = calculateTimeLeft(endsAt);

  const cardCol = document.createElement("div");
  cardCol.classList.add(
    "col-12",
    "col-md-6",
    "col-lg-3",
    "carouselCards",
    "mb-3"
  );

  const link = document.createElement("a");
  link.href = `/listing/index.html?id=${id}`;
  link.classList.add("text-decoration-none", "text-dark");
  cardCol.appendChild(link);

  const card = document.createElement("div");
  card.classList.add("card", "mb-3", "rounded-3", "border-dark");
  link.appendChild(card);

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header", "bg-light-blue", "text-center");
  card.appendChild(cardHeader);

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "mb-0");
  cardTitle.textContent = title;
  cardHeader.appendChild(cardTitle);

  const cardImage = document.createElement("img");

  if (media && media.length > 0 && media[0].url) {
    cardImage.src = media[0].url;
    cardImage.alt = `Listing image of a ${title}`;
  } else {
    cardImage.src =
      "https://plus.unsplash.com/premium_photo-1667539633338-5b7afd626193?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    cardImage.alt = "Placeholder image for the listing";
  }

  cardImage.onerror = function () {
    this.src = "/images/example_image.png";
    this.alt = "Placeholder image for the listing";
  };

  cardImage.classList.add("card-img-top");
  card.appendChild(cardImage);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "bg-dark");
  card.appendChild(cardBody);

  const daysLeftText = document.createElement("p");
  daysLeftText.classList.add("card-text");
  daysLeftText.textContent = `Expires in ${daysLeft}`;
  cardBody.appendChild(daysLeftText);

  return cardCol;
}
