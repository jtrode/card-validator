import { digitsOnly } from '../utils/sanitize.js';

/**
 * Validates a card number using the Luhn algorithm (ISO/IEC 7812-1).
 *
 * Steps:
 *   1. Starting from the second-to-last digit, double every second digit.
 *   2. If the doubled value exceeds 9, subtract 9.
 *   3. Sum all digits. A valid number produces a total divisible by 10.
 *
 * @param {string} number - Raw card number string (formatting characters allowed).
 * @returns {{ valid: boolean, reason?: string }}
 */
export function validateLuhn(number) {
  const digits = digitsOnly(number);

  if (digits.length === 0) {
    return { valid: false, reason: 'Card number is required' };
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {digit -= 9;}
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  if (sum % 10 !== 0) {
    return { valid: false, reason: 'Failed Luhn checksum' };
  }

  return { valid: true };
}
