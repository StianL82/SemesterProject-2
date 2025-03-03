/**
 * Opens an image modal displaying a full-size version of the selected image.
 *
 * @param {string} imageSrc - The source URL of the image to display.
 * @param {string} [imageAlt="Full-size image"] - The alt text for the image.
 */
export function openImageModal(imageSrc, imageAlt) {
  const modalBody = document.querySelector(".imageModal");

  modalBody.innerHTML = "";

  const modalImage = document.createElement("img");
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt || "Full-size image";
  modalImage.classList.add("img-fluid");

  modalBody.appendChild(modalImage);

  const modalTitle = document.getElementById("imageModalLabel");
  modalTitle.textContent = imageAlt || "Full-size Image";

  const bootstrapModal = new bootstrap.Modal(
    document.getElementById("imageModal"),
  );
  bootstrapModal.show();
}

/**
 * Enables the image modal functionality by attaching click event listeners
 * to the main listing image and extra images.
 */
export function enableImageModal() {
  const mainImage = document.querySelector(".main-listing-image");
  mainImage.addEventListener("click", () => {
    openImageModal(mainImage.src, mainImage.alt);
  });

  const extraImages = document.querySelectorAll(".extraImageContainer img");
  extraImages.forEach((img) => {
    img.addEventListener("click", () => {
      openImageModal(img.src, img.alt);
    });
  });
}
