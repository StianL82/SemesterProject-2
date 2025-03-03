/**
 * Loads and parses a value from localStorage.
 *
 * @param {string} key - The key of the item to retrieve from localStorage.
 * @returns {any|null} The parsed value if found and valid, otherwise `null`.
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}
