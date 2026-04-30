/**
 * Card type definitions.
 *
 * Each entry contains:
 *   - type:      Internal identifier (snake_case)
 *   - label:     Human-readable brand name
 *   - pattern:   Regex tested against the sanitized card number
 *   - lengths:   Valid card number lengths for this brand
 *   - cvvLength: Expected CVV/CVC digit count
 */
export const CARD_TYPES = [
  {
    type: 'amex',
    label: 'American Express',
    pattern: /^3[47]/,
    lengths: [15],
    cvvLength: 4,
  },
  {
    type: 'dinersclub',
    label: 'Diners Club',
    pattern: /^3(?:0[0-5]|[68])/,
    lengths: [14],
    cvvLength: 3,
  },
  {
    type: 'jcb',
    label: 'JCB',
    pattern: /^35(?:2[89]|[3-8])/,
    lengths: [16],
    cvvLength: 3,
  },
  {
    type: 'unionpay',
    label: 'UnionPay',
    pattern: /^62/,
    lengths: [16, 17, 18, 19],
    cvvLength: 3,
  },
  {
    type: 'maestro',
    label: 'Maestro',
    pattern: /^(?:6304|6759|676[123])/,
    lengths: [12, 13, 14, 15, 16, 17, 18, 19],
    cvvLength: 3,
  },
  {
    type: 'discover',
    label: 'Discover',
    pattern: /^(?:6011|622(?:1(?:2[6-9]|[3-9])|[2-8]|9(?:[01]|2[0-5]))|64[4-9]|65)/,
    lengths: [16],
    cvvLength: 3,
  },
  {
    type: 'mastercard',
    label: 'Mastercard',
    pattern: /^(?:5[1-5]|2(?:2[2-9][1-9]|[3-6]\d{2}|7(?:[01]\d|20)))/,
    lengths: [16],
    cvvLength: 3,
  },
  {
    type: 'visa',
    label: 'Visa',
    pattern: /^4/,
    lengths: [13, 16, 19],
    cvvLength: 3,
  },
];

export const UNKNOWN_CARD = {
  type: 'unknown',
  label: 'Unknown',
  cvvLength: 3,
};
