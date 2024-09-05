export function startCountdown(endTime) {
  const countdownElement = document.querySelector(".text-danger");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = new Date(endTime).getTime() - now;

    if (distance <= 0) {
      countdownElement.textContent = "Auction has ended!";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}min ${seconds}sec`;
  }

  const countdownInterval = setInterval(updateCountdown, 1000);

  updateCountdown();
}
