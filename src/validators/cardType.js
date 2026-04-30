import { digitsOnly } from '../utils/sanitize.js';
import { CARD_TYPES, UNKNOWN_CARD } from '../constants.js';

/**
 * Detects the card brand from the card number's IIN/BIN (first 6 digits).
 *
 * Card types are tested in specificity order — more specific patterns
 * (Amex, Diners, JCB) are checked before broader ones (Visa).
 *
 * @param {string} number - Raw card number string.
 * @returns {{ type: string, label: string, cvvLength: number, lengths?: number[] }}
 */
export function detectCardType(number) {
  const digits = digitsOnly(number);

  for (const card of CARD_TYPES) {
    if (card.pattern.test(digits)) {
      return {
        type: card.type,
        label: card.label,
        cvvLength: card.cvvLength,
        lengths: card.lengths,
      };
    }
  }

  return { ...UNKNOWN_CARD };
}
