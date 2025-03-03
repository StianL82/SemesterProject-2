/**
 * Saves a value to localStorage after converting it to a JSON string.
 *
 * @param {string} key - The key under which the value will be stored.
 * @param {any} value - The value to store in localStorage.
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
