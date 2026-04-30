import { validateExpiration } from '../src/validators/expiration.js';

describe('validateExpiration', () => {
  const currentYear = new Date().getFullYear();
  const futureYear = currentYear + 2;

  describe('valid dates', () => {
    it('accepts a future MM/YY date', () => {
      const result = validateExpiration(`12/${String(futureYear).slice(-2)}`);
      expect(result).toMatchObject({ valid: true, month: 12 });
    });

    it('accepts a future MM/YYYY date', () => {
      const result = validateExpiration(`06/${futureYear}`);
      expect(result).toMatchObject({ valid: true, month: 6, year: futureYear });
    });

    it('accepts the current month as still valid', () => {
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yy = String(now.getFullYear()).slice(-2);
      expect(validateExpiration(`${mm}/${yy}`)).toMatchObject({ valid: true });
    });
  });

  describe('invalid dates', () => {
    it('rejects a past year', () => {
      expect(validateExpiration('01/20')).toMatchObject({ valid: false, reason: 'Card has expired' });
    });

    it('rejects a past month in the current year', () => {
      const now = new Date();
      if (now.getMonth() === 0) {return;} // January — skip, no previous month this year
      const lastMonth = String(now.getMonth()).padStart(2, '0');
      const yy = String(now.getFullYear()).slice(-2);
      expect(validateExpiration(`${lastMonth}/${yy}`)).toMatchObject({ valid: false });
    });

    it('rejects month 00', () => {
      expect(validateExpiration(`00/${futureYear}`)).toMatchObject({ valid: false });
    });

    it('rejects month 13', () => {
      expect(validateExpiration(`13/${futureYear}`)).toMatchObject({ valid: false });
    });
  });

  describe('format validation', () => {
    it('rejects a missing slash', () => {
      expect(validateExpiration('1226')).toMatchObject({ valid: false });
    });

    it('rejects an empty string', () => {
      expect(validateExpiration('')).toMatchObject({ valid: false });
    });

    it('rejects null', () => {
      expect(validateExpiration(null)).toMatchObject({ valid: false });
    });
  });
});
