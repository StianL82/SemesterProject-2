export function openImageModal(imageSrc, imageAlt) {
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;

  const modalTitle = document.getElementById("imageModalLabel");
  modalTitle.textContent = imageAlt || "Full-size Image";

  const bootstrapModal = new bootstrap.Modal(
    document.getElementById("imageModal")
  );
  bootstrapModal.show();
}

export function enableImageModal(listing) {
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
