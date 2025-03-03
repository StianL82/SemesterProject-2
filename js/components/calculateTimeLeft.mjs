/**
 * Calculates the remaining time until a given deadline.
 *
 * @param {string} endsAt - The end date and time in ISO format.
 * @returns {string} A string representing the remaining time (e.g., "2 days", "5 hours", "10 minutes", or "Expired").
 */
export function calculateTimeLeft(endsAt) {
  const now = new Date();
  const endsAtDate = new Date(endsAt);
  const timeDiff = endsAtDate - now;

  const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysLeft > 0) {
    return `${daysLeft} days`;
  } else {
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));

    if (hoursLeft > 1) {
      return `${hoursLeft} hours`;
    } else if (hoursLeft === 1) {
      return `${hoursLeft} hour`;
    } else if (hoursLeft < 1 && timeDiff > 0) {
      const minutesLeft = Math.ceil(timeDiff / (1000 * 60));
      return minutesLeft > 1
        ? `${minutesLeft} minutes`
        : `${minutesLeft} minute`;
    } else {
      return "Expired";
    }
  }
}
