import { digitsOnly } from './utils/sanitize.js';
import { validateLuhn } from './validators/luhn.js';
import { detectCardType } from './validators/cardType.js';
import { validateExpiration } from './validators/expiration.js';
import { validateCvv } from './validators/cvv.js';

export { validateLuhn } from './validators/luhn.js';
export { detectCardType } from './validators/cardType.js';
export { validateExpiration } from './validators/expiration.js';
export { validateCvv } from './validators/cvv.js';

/**
 * Runs a full validation pass on a payment card.
 *
 * @param {{ number: string, expiration: string, cvv: string }} card
 * @returns {{
 *   valid: boolean,
 *   errors: string[],
 *   card: {
 *     type: string,
 *     label: string,
 *     number: string,
 *     luhn: boolean,
 *     expiration: object,
 *     cvv: object,
 *   }
 * }}
 */
export function validate({ number, expiration, cvv }) {
  const errors = [];

  // Sanitize and detect type first so CVV validation uses the correct length.
  const sanitizedNumber = digitsOnly(number);
  const cardTypeResult = detectCardType(sanitizedNumber);

  const luhnResult = validateLuhn(sanitizedNumber);
  if (!luhnResult.valid) {errors.push(luhnResult.reason);}

  const expirationResult = validateExpiration(expiration);
  if (!expirationResult.valid) {errors.push(expirationResult.reason);}

  const cvvResult = validateCvv(cvv, cardTypeResult.type);
  if (!cvvResult.valid) {errors.push(cvvResult.reason);}

  return {
    valid: errors.length === 0,
    ...(errors.length > 0 && { errors }),
    card: {
      type: cardTypeResult.type,
      label: cardTypeResult.label,
      number: sanitizedNumber,
      luhn: luhnResult.valid,
      expiration: expirationResult,
      cvv: cvvResult,
    },
  };
}
