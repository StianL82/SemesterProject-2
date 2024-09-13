export function getListingId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}
