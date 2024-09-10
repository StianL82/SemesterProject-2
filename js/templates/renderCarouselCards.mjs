import { getListingsWithShortestDeadline } from "/js/api/listings/carouselListings.mjs";
import { createCarouselCard } from "./carouselCard.mjs";

export async function setupCarousel() {
  const listings = await getListingsWithShortestDeadline();
  const carouselInner = document.querySelector(".carousel-inner");

  carouselInner.innerHTML = "";

  let slides = [[], [], []];

  listings.forEach((listing, index) => {
    const card = createCarouselCard(listing);
    const slideIndex = Math.floor(index / 4);
    slides[slideIndex].push(card);
  });

  slides.forEach((slide, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
      carouselItem.classList.add("active");
    }

    const row = document.createElement("div");
    row.classList.add("row");

    slide.forEach((card) => {
      row.appendChild(card);
    });

    carouselItem.appendChild(row);

    carouselInner.appendChild(carouselItem);
  });
}

