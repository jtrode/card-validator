import { detectCardType } from '../src/validators/cardType.js';

describe('detectCardType', () => {
  it('detects Visa', () => {
    expect(detectCardType('4111111111111111')).toMatchObject({ type: 'visa', label: 'Visa' });
  });

  it('detects Mastercard (5x prefix)', () => {
    expect(detectCardType('5500005555555559')).toMatchObject({ type: 'mastercard' });
  });

  it('detects Mastercard (2-series prefix)', () => {
    expect(detectCardType('2221000000000009')).toMatchObject({ type: 'mastercard' });
  });

  it('detects American Express (34 prefix)', () => {
    expect(detectCardType('341111111111111')).toMatchObject({ type: 'amex', cvvLength: 4 });
  });

  it('detects American Express (37 prefix)', () => {
    expect(detectCardType('378282246310005')).toMatchObject({ type: 'amex', cvvLength: 4 });
  });

  it('detects Discover', () => {
    expect(detectCardType('6011111111111117')).toMatchObject({ type: 'discover' });
  });

  it('detects JCB', () => {
    expect(detectCardType('3530111333300000')).toMatchObject({ type: 'jcb' });
  });

  it('detects Diners Club', () => {
    expect(detectCardType('30569309025904')).toMatchObject({ type: 'dinersclub' });
  });

  it('returns unknown for an unrecognized number', () => {
    expect(detectCardType('9999999999999999')).toMatchObject({ type: 'unknown' });
  });

  it('strips formatting characters before detecting', () => {
    expect(detectCardType('4111 1111 1111 1111')).toMatchObject({ type: 'visa' });
  });
});
