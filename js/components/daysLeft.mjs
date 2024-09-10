export function calculateDaysLeft(endsAt) {
  const now = new Date();
  const endsAtDate = new Date(endsAt);
  const timeDiff = endsAtDate - now;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysLeft > 0 ? daysLeft : 0;
}
