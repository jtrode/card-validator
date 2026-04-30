import { validateCvv } from '../src/validators/cvv.js';

describe('validateCvv', () => {
  describe('Visa / Mastercard / Discover (3-digit CVV)', () => {
    it('accepts a 3-digit CVV for visa', () => {
      expect(validateCvv('123', 'visa')).toEqual({ valid: true });
    });

    it('rejects a 4-digit CVV for visa', () => {
      expect(validateCvv('1234', 'visa')).toMatchObject({ valid: false });
    });

    it('rejects a 2-digit CVV for mastercard', () => {
      expect(validateCvv('12', 'mastercard')).toMatchObject({ valid: false });
    });
  });

  describe('American Express (4-digit CID)', () => {
    it('accepts a 4-digit CVV for amex', () => {
      expect(validateCvv('1234', 'amex')).toEqual({ valid: true });
    });

    it('rejects a 3-digit CVV for amex', () => {
      expect(validateCvv('123', 'amex')).toMatchObject({ valid: false });
    });
  });

  describe('edge cases', () => {
    it('rejects an empty string', () => {
      expect(validateCvv('')).toMatchObject({ valid: false });
    });

    it('rejects null', () => {
      expect(validateCvv(null)).toMatchObject({ valid: false });
    });

    it('defaults to 3-digit check when card type is unknown', () => {
      expect(validateCvv('123', 'unknown')).toEqual({ valid: true });
    });
  });
});
