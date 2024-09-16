import * as components from "/js/components/index.mjs";

export function renderSingleListing(listing) {
  const loggedInUser = components.getLoggedInUser();
  const sellerName = listing.seller.name;

  const bidInputGroup = document.querySelector(".input-group");
  if (loggedInUser && loggedInUser.name === sellerName) {
    bidInputGroup.style.display = "none";
  }

  const titleElement = document.querySelector(".itemTitle");
  titleElement.textContent = listing.title;

  const descriptionElement = document.querySelector(".itemDescription");

  if (listing.description && listing.description.trim() !== "") {
    descriptionElement.textContent = listing.description;
  } else {
    descriptionElement.textContent = "No description added";
  }
  

  const mainImage = document.querySelector(".main-listing-image");
  if (listing.media && listing.media.length > 0) {
    mainImage.src = listing.media[0].url;
    mainImage.alt = listing.media[0].alt || `Listing image of ${listing.title}`;
  } else {
    mainImage.src =
      "https://plus.unsplash.com/premium_photo-1667539633338-5b7afd626193?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    mainImage.alt = "Placeholder image for the listing";
  }

  const extraImageContainer = document.querySelector(".extraImageContainer");
  extraImageContainer.innerHTML = "";

  if (listing.media && listing.media.length > 1) {
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

  components.enableImageModal(listing);

  const sellerElement = document.querySelector(".seller");
  if (listing.seller && listing.seller.name) {
    sellerElement.textContent = listing.seller.name;
  } else {
    sellerElement.textContent = "Unknown seller";
  }

  const listedOnElement = document.querySelector(".listedOn");
  const createdDate = new Date(listing.created).toLocaleDateString("en-GB");

  if (listedOnElement) {
    listedOnElement.textContent = createdDate;
  }

  const endsAtElement = document.querySelector(".expires");
  const currentDate = new Date();
  const endsAtDate = new Date(listing.endsAt);

  if (listing.endsAt) {
    const formattedEndsAt = endsAtDate.toLocaleDateString("en-GB");
    endsAtElement.textContent = formattedEndsAt;

    if (endsAtDate < currentDate) {
      const bidContainer = document.querySelector(".bidContainer");
      if (bidContainer) {
        bidContainer.style.display = "none";
      }

      const endedMessage = document.createElement("p");
      endedMessage.textContent = "This listing has ended.";
      endedMessage.classList.add("alert", "alert-warning", "text-center");

      const showIfLoggedInBlock = document.querySelector(
        ".showIfLoggedInBlock"
      );
      if (showIfLoggedInBlock) {
        showIfLoggedInBlock.appendChild(endedMessage);
      }
    } else {
      const bidContainer = document.querySelector(".bidContainer");
      if (bidContainer) {
        bidContainer.style.display = "block";
      }

      components.startCountdown(listing.endsAt);
    }
  } else {
    endsAtElement.textContent = "No expiration date";
  }

  if (listing.endsAt) {
    components.startCountdown(listing.endsAt);
  }

  let highestBid = 0;
  let highestBidder = null;
  if (listing.bids && listing.bids.length > 0) {
    highestBid = Math.max(...listing.bids.map((bid) => bid.amount));
    highestBidder = listing.bids.find((bid) => bid.amount === highestBid)
      ?.bidder.name;
  }

  const bidHistoryContainer = document.querySelector(".bidHistoryContainer");
  bidHistoryContainer.innerHTML = "";

  if (listing.bids && listing.bids.length > 0) {
    listing.bids.forEach((bid) => {
      const bidElement = document.createElement("div");
      bidElement.classList.add("d-flex", "justify-content-between", "mb-2");

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

  const numberOfBidsElement = document.querySelector(".BidNumber");
  if (listing._count && listing._count.bids >= 0) {
    numberOfBidsElement.textContent = `Number of bids: ${listing._count.bids}`;
  } else {
    numberOfBidsElement.textContent = "No bids yet.";
  }

  const bidButton = document.querySelector(".btn-bid");
  bidButton.addEventListener("click", async () => {
    const bidInputElement = document.querySelector("#bidInput");
    const bidAmount = parseFloat(bidInputElement.value);

    bidInputElement.value = "";

    if (isNaN(bidAmount) || bidAmount <= highestBid) {
      alert(
        `Bid must be higher than the current highest bid of ${highestBid}.`
      );
      return;
    }

    const handleConfirmBid = async () => {
      const modalElement = document.getElementById("bidConfirmationModal");
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.hide();

      try {
        await components.placeBid(listing.id, bidAmount);
        alert("Your bid was placed successfully!");
        location.reload();
      } catch (error) {
        alert(error.message || "Failed to place bid. Please try again.");
      }
    };

    if (loggedInUser && highestBidder === loggedInUser.name) {
      const modalElement = document.getElementById("bidConfirmationModal");
      const modalBody = modalElement.querySelector(".modal-body");
      modalBody.textContent = `You already have the highest bid of ${highestBid}. Do you still want to place a higher bid?`;

      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();

      const confirmButton = modalElement.querySelector(".btn-confirm");

      confirmButton.removeEventListener("click", handleConfirmBid);

      confirmButton.addEventListener("click", handleConfirmBid);

      return;
    }

    try {
      await components.placeBid(listing.id, bidAmount);
      alert("Your bid was placed successfully!");
      location.reload();
    } catch (error) {
      alert(error.message || "Failed to place bid. Please try again.");
    }
  });
}
