/**
 * Strips all non-digit characters from a string.
 * Handles common card formatting (spaces, dashes, dots).
 *
 * @param {string} value
 * @returns {string}
 */
export function digitsOnly(value) {
  if (typeof value !== 'string') {return '';}
  return value.replace(/\D/g, '');
}
