import { getListingsWithShortestDeadline } from "/js/api/listings/carouselListings.mjs";
import { createCarouselCard } from "./carouselCard.mjs";
import * as components from "/js/components/index.mjs";

export async function setupCarousel() {
  components.showLoadingIndicator();

  try {
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
  } catch (error) {
    console.error("Error fetching or rendering carousel listings:", error);

    if (error.message === "Failed to fetch") {
      alert(
        "Network error. Please check your internet connection and try again."
      );
    } else if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      alert("Client error. Please check your request.");
    } else if (error.response && error.response.status >= 500) {
      alert("Server error. Please try again later.");
    } else {
      alert("An unexpected error occurred. Please try again.");
    }

    const carouselContainer = document.querySelector(".carousel-inner");
    const errorMessage = components.displayError(
      "We are having trouble fetching the information from the API"
    );
    carouselContainer.innerHTML = "";
    carouselContainer.appendChild(errorMessage);
  } finally {
    components.hideLoadingIndicator();
  }
}
