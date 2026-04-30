import { digitsOnly } from '../utils/sanitize.js';
import { CARD_TYPES, UNKNOWN_CARD } from '../constants.js';

/**
 * Returns the expected CVV length for a given card type identifier.
 *
 * @param {string} cardType - Card type string (e.g. 'visa', 'amex').
 * @returns {number}
 */
function getCvvLength(cardType) {
  const card = CARD_TYPES.find((c) => c.type === cardType);
  return card ? card.cvvLength : UNKNOWN_CARD.cvvLength;
}

/**
 * Validates the CVV/CVC value for a given card type.
 *
 * American Express expects 4 digits (CID); all other major networks use 3.
 *
 * @param {string} cvv      - Raw CVV string.
 * @param {string} cardType - Card type identifier (output of detectCardType).
 * @returns {{ valid: boolean, reason?: string }}
 */
export function validateCvv(cvv, cardType = 'unknown') {
  const digits = digitsOnly(cvv);

  if (digits.length === 0) {
    return { valid: false, reason: 'CVV is required' };
  }

  if (!/^\d+$/.test(digits)) {
    return { valid: false, reason: 'CVV must contain only digits' };
  }

  const expectedLength = getCvvLength(cardType);

  if (digits.length !== expectedLength) {
    return {
      valid: false,
      reason: `CVV must be ${expectedLength} digits for ${cardType}`,
    };
  }

  return { valid: true };
}
