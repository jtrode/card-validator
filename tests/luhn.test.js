import { validateLuhn } from '../src/validators/luhn.js';

describe('validateLuhn', () => {
  describe('valid numbers', () => {
    it('accepts a valid Visa test number', () => {
      expect(validateLuhn('4111111111111111')).toEqual({ valid: true });
    });

    it('accepts a valid Amex test number', () => {
      expect(validateLuhn('378282246310005')).toEqual({ valid: true });
    });

    it('accepts a valid Mastercard test number', () => {
      expect(validateLuhn('5500005555555559')).toEqual({ valid: true });
    });

    it('strips spaces before validating', () => {
      expect(validateLuhn('4111 1111 1111 1111')).toEqual({ valid: true });
    });

    it('strips dashes before validating', () => {
      expect(validateLuhn('4111-1111-1111-1111')).toEqual({ valid: true });
    });
  });

  describe('invalid numbers', () => {
    it('rejects a number with a bad checksum', () => {
      expect(validateLuhn('1234567890123456')).toMatchObject({ valid: false });
    });

    it('returns reason on failure', () => {
      expect(validateLuhn('1234567890123456').reason).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('returns invalid for an empty string', () => {
      expect(validateLuhn('')).toMatchObject({ valid: false });
    });

    it('returns invalid for a non-string input', () => {
      expect(validateLuhn(null)).toMatchObject({ valid: false });
    });
  });
});
