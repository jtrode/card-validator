# card-validator

[![CI](https://github.com/jtrode/card-validator/actions/workflows/ci.yml/badge.svg)](https://github.com/jtrode/card-validator/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/lightweight-card-validator)](https://www.npmjs.com/package/lightweight-card-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

A lightweight, zero-dependency Node.js library for validating payment card data. Supports card number validation via the **Luhn algorithm**, automatic **card type detection**, **expiration date** checking, and **CVV/CVC** length validation.

---

## Features

- **Luhn algorithm** — industry-standard checksum validation for card numbers
- **Card type detection** — identifies Visa, Mastercard, American Express, Discover, Diners Club, JCB, UnionPay, and Maestro
- **Expiration date validation** — validates MM/YY and MM/YYYY formats and checks against the current date
- **CVV/CVC validation** — validates length according to the detected card type (3 or 4 digits)
- **Input sanitization** — strips spaces, dashes, and other common formatting characters before validation
- **Detailed error messages** — every validation result includes a human-readable reason when invalid
- **Zero dependencies** — no external packages required at runtime
- **Fully tested** — comprehensive test suite with Jest covering edge cases

---

## Project Structure

```
card-validator/
├── src/
│   ├── validators/
│   │   ├── luhn.js          # Luhn checksum algorithm
│   │   ├── cardType.js      # Card brand detection via regex patterns
│   │   ├── expiration.js    # Expiration date format and range checks
│   │   └── cvv.js           # CVV/CVC length validation
│   ├── utils/
│   │   └── sanitize.js      # Input normalization helpers
│   ├── constants.js         # Card type definitions, patterns, CVV lengths
│   └── index.js             # Public API — validate() and individual exports
├── tests/
│   ├── luhn.test.js
│   ├── cardType.test.js
│   ├── expiration.test.js
│   ├── cvv.test.js
│   └── index.test.js
├── .eslintrc.json
├── .gitignore
├── package.json
└── README.md
```

---

## Installation

```bash
npm install lightweight-card-validator
```

Or, to work on the project locally:

```bash
git clone https://github.com/jtrode/card-validator.git
cd card-validator
npm install
```

> **Note:** This library has **zero runtime dependencies**. `npm install` only installs dev tooling (Jest, ESLint).

---

## Usage

### Full card validation

```js
import { validate } from './src/index.js';

const result = validate({
  number: '4111 1111 1111 1111',
  expiration: '12/26',
  cvv: '123',
});

console.log(result);
// {
//   valid: true,
//   card: {
//     type: 'visa',
//     label: 'Visa',
//     number: '4111111111111111',
//     luhn: true,
//     expiration: { valid: true, month: 12, year: 2026 },
//     cvv: { valid: true },
//   },
// }
```

### Individual validators

```js
import { validateLuhn } from './src/index.js';
import { detectCardType } from './src/index.js';
import { validateExpiration } from './src/index.js';
import { validateCvv } from './src/index.js';

// Luhn check
validateLuhn('4111111111111111');
// { valid: true }

validateLuhn('1234567890123456');
// { valid: false, reason: 'Failed Luhn checksum' }

// Card type detection
detectCardType('4111111111111111');
// { type: 'visa', label: 'Visa', cvvLength: 3 }

detectCardType('378282246310005');
// { type: 'amex', label: 'American Express', cvvLength: 4 }

detectCardType('9999999999999999');
// { type: 'unknown', label: 'Unknown', cvvLength: 3 }

// Expiration date
validateExpiration('12/26');
// { valid: true, month: 12, year: 2026 }

validateExpiration('01/20');
// { valid: false, reason: 'Card has expired' }

// CVV
validateCvv('123', 'visa');
// { valid: true }

validateCvv('12', 'visa');
// { valid: false, reason: 'CVV must be 3 digits for visa' }
```

---

## API Reference

### `validate(card)`

Runs all validations in one call and returns a unified result.

| Parameter          | Type   | Required | Description                               |
|--------------------|--------|----------|-------------------------------------------|
| `card.number`      | string | Yes      | Raw card number (spaces and dashes OK)    |
| `card.expiration`  | string | Yes      | Expiration date in `MM/YY` or `MM/YYYY`   |
| `card.cvv`         | string | Yes      | CVV / CVC / CID value                     |

**Returns:** `{ valid: boolean, card: CardResult, errors?: string[] }`

---

### `validateLuhn(number)`

Validates a card number string using the Luhn algorithm. Strips non-digit characters automatically.

**Returns:** `{ valid: boolean, reason?: string }`

---

### `detectCardType(number)`

Detects the card brand from the leading digits using IIN/BIN ranges.

**Returns:** `{ type: string, label: string, cvvLength: number }`

Supported types: `visa`, `mastercard`, `amex`, `discover`, `dinersclub`, `jcb`, `unionpay`, `maestro`, `unknown`

---

### `validateExpiration(expiration)`

Validates an expiration string in `MM/YY` or `MM/YYYY` format and checks it against the current date.

**Returns:** `{ valid: boolean, month?: number, year?: number, reason?: string }`

---

### `validateCvv(cvv, cardType)`

Validates the CVV length for the given card type.

**Returns:** `{ valid: boolean, reason?: string }`

---

## Supported Card Types

| Brand             | Prefix(es)                    | Length(s) | CVV |
|-------------------|-------------------------------|-----------|-----|
| Visa              | 4                             | 13, 16    | 3   |
| Mastercard        | 51–55, 2221–2720              | 16        | 3   |
| American Express  | 34, 37                        | 15        | 4   |
| Discover          | 6011, 622126–622925, 644–649, 65 | 16     | 3   |
| Diners Club       | 300–305, 36, 38               | 14        | 3   |
| JCB               | 3528–3589                     | 16        | 3   |
| UnionPay          | 62                            | 16–19     | 3   |
| Maestro           | 6304, 6759, 6761–6763         | 12–19     | 3   |

---

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## Linting

```bash
# Check for lint errors
npm run lint

# Auto-fix fixable issues
npm run lint:fix
```

---

## How It Works

### Luhn Algorithm

Every major card network uses the Luhn algorithm (ISO/IEC 7812-1) to catch accidental digit transpositions. The algorithm:

1. Doubles every second digit from the right
2. If the doubled value exceeds 9, subtracts 9
3. Sums all digits
4. A valid number produces a total divisible by 10

### Card Type Detection

Card types are identified by their **Issuer Identification Number (IIN)**, which is the first 6 digits of the card number. Each network has reserved specific numeric ranges, encoded as regular expressions in `src/constants.js`.

### Expiration Validation

The library parses `MM/YY` and `MM/YYYY` formats, normalizes the year to 4 digits, and compares the resulting date against the first day of the month following expiration (cards are valid through the end of their expiration month).

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please make sure to update or add tests as appropriate and keep coverage above 90%.

---

## License

[MIT](./LICENSE) © jrode
