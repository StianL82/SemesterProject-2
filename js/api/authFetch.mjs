import { load } from "../storage/index.mjs";
import { API_KEY } from "./constants.mjs";

/**
 * Generates the headers required for authenticated API requests.
 *
 * @returns {Object} An object containing headers including `Content-Type`, `Authorization`, and `X-Noroff-API-key`.
 */
export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-key": API_KEY,
  };
}

/**
 * Performs a fetch request with authentication headers.
 *
 * @param {string} url - The API endpoint URL.
 * @param {Object} [options={}] - Optional fetch options.
 * @returns {Promise<Response>} A promise that resolves to the fetch response.
 */
export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
