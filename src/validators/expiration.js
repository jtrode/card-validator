/**
 * Validates an expiration date string.
 *
 * Accepts:
 *   - MM/YY  (e.g. "12/26")
 *   - MM/YYYY (e.g. "12/2026")
 *
 * A card is considered valid through the last day of its expiration month,
 * so we compare against the first day of the *following* month.
 *
 * @param {string} expiration - Expiration date string.
 * @returns {{ valid: boolean, month?: number, year?: number, reason?: string }}
 */
export function validateExpiration(expiration) {
  if (!expiration || typeof expiration !== 'string') {
    return { valid: false, reason: 'Expiration date is required' };
  }

  const match = expiration.trim().match(/^(\d{1,2})\/(\d{2}|\d{4})$/);

  if (!match) {
    return { valid: false, reason: 'Invalid expiration format — use MM/YY or MM/YYYY' };
  }

  const month = parseInt(match[1], 10);
  const rawYear = match[2];
  const year = rawYear.length === 2
    ? 2000 + parseInt(rawYear, 10)
    : parseInt(rawYear, 10);

  if (month < 1 || month > 12) {
    return { valid: false, reason: 'Invalid month — must be between 01 and 12' };
  }

  // Cards expire at the end of the stated month.
  // We compare against the first moment of the next month.
  const expiryDate = new Date(year, month); // month is 0-indexed, so `month` here = month+1
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (expiryDate <= today && expiryDate.getMonth() !== today.getMonth()) {
    return { valid: false, reason: 'Card has expired' };
  }

  // More precise: the card is expired if the expiry month/year is strictly in the past
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-indexed

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { valid: false, reason: 'Card has expired' };
  }

  return { valid: true, month, year };
}
