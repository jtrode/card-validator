import { validate } from '../src/index.js';

const futureYear = new Date().getFullYear() + 2;
const futureExpiry = `12/${String(futureYear).slice(-2)}`;

describe('validate (full card)', () => {
  describe('valid cards', () => {
    it('validates a correct Visa card', () => {
      const result = validate({
        number: '4111 1111 1111 1111',
        expiration: futureExpiry,
        cvv: '123',
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
      expect(result.card.type).toBe('visa');
      expect(result.card.luhn).toBe(true);
    });

    it('validates a correct Amex card', () => {
      const result = validate({
        number: '378282246310005',
        expiration: futureExpiry,
        cvv: '1234',
      });
      expect(result.valid).toBe(true);
      expect(result.card.type).toBe('amex');
    });
  });

  describe('invalid cards', () => {
    it('fails on bad Luhn checksum', () => {
      const result = validate({
        number: '4111111111111112',
        expiration: futureExpiry,
        cvv: '123',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Failed Luhn checksum');
    });

    it('fails on expired card', () => {
      const result = validate({
        number: '4111111111111111',
        expiration: '01/20',
        cvv: '123',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Card has expired');
    });

    it('fails on wrong CVV length for Amex', () => {
      const result = validate({
        number: '378282246310005',
        expiration: futureExpiry,
        cvv: '123',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('CVV'))).toBe(true);
    });

    it('collects multiple errors at once', () => {
      const result = validate({
        number: '1234567890123456',
        expiration: '01/20',
        cvv: '',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
