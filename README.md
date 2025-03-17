# Currency Code to Country Flag

A React component library for displaying country flags based on currency codes or country codes. The package includes local SVG flag files in both square (1:1) and rectangular (4:3) aspect ratios.

## Installation

```bash
npm install currency-code-to-country-flag
```

## Usage

You can use the `CountryFlag` component in two ways:

### 1. Display flag using currency code

```jsx
import { CountryFlag } from 'currency-code-to-country-flag';

function App() {
  return (
    <div>
      <CountryFlag currency="USD" />
      <CountryFlag currency="EUR" />
      <CountryFlag currency="JPY" />
      <CountryFlag currency="LAK" />
      <CountryFlag currency="THB" />
      <CountryFlag currency="CNY" />
    </div>
  );
}
```

### 2. Display flag using country code

```jsx
import { CountryFlag } from 'currency-code-to-country-flag';

function App() {
  return (
    <div>
      <CountryFlag country="US" />
      <CountryFlag country="MM" />
      <CountryFlag country="DE" />
    </div>
  );
}
```

### 3. Choose aspect ratio (square or rectangular flags)

```jsx
import { CountryFlag } from 'currency-code-to-country-flag';

function App() {
  return (
    <div>
      <CountryFlag country="US" ratio="square" /> {/* Square flag (1:1) */}
      <CountryFlag country="US" ratio="rectangle" /> {/* Rectangular flag (4:3) */}
    </div>
  );
}
```

## Props

| Prop      | Type                             | Description                                           | Default |
|-----------|----------------------------------|-------------------------------------------------------|---------|
| currency  | string                           | ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY')    | -       |
| country   | string                           | ISO 3166-1 alpha-2 country code (e.g., 'US', 'DE')    | -       |
| size      | '16' \| '24' \| '32' \| '48' \| '64' | Size of the flag image in pixels                  | '32'    |
| ratio     | 'square' \| 'rectangle'          | Aspect ratio of the flag (square 1:1 or rectangular 4:3) | 'square' |
| alt       | string                           | Custom alt text for the flag image                     | Auto-generated |
| className | string                           | Additional CSS class names                             | ''      |
| style     | React.CSSProperties              | Additional inline styles                               | {}      |

## Notes

- Either `currency` or `country` prop must be provided.
- If both are provided, `country` takes precedence.
- Currency codes are mapped to their primary issuing country.
- All currency and country codes should be provided in ISO standard format.
- The package includes SVG flag files for all countries in both square and rectangular aspect ratios.

## Credits

Flag icons provided by [flag-icons](https://github.com/lipis/flag-icons) project.

## License

MIT