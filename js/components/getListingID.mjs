/**
 * Retrieves the listing ID from the URL query parameters.
 *
 * @returns {string|null} The listing ID if found, otherwise `null`.
 */
export function getListingId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}
