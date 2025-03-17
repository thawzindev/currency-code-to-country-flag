import React from 'react';
import { currencyToCountry } from './currencyToCountry';
import { config, FlagSize } from './config';

type BaseCountryFlagProps = {
  /** Flag size (16, 24, 32, 48, or 64 pixels) */
  size?: FlagSize;
  /** Flag aspect ratio: 'square' (1:1) or 'rectangle' (4:3) */
  ratio?: 'square' | 'rectangle';
  /** Custom alt text for the flag image */
  alt?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Test ID for testing - internal use */
  'data-testid'?: string;
}

type CurrencyProp = {
  /** ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY') */
  currency: string;
  country?: never;
}

type CountryProp = {
  /** ISO 3166-1 alpha-2 country code (e.g., 'US', 'DE', 'JP') */
  country: string;
  currency?: never;
}

export type CountryFlagProps = BaseCountryFlagProps & (CurrencyProp | CountryProp);

/**
 * CountryFlag component displays a country flag based on currency code or country code
 * using local flag SVG files from assets/flags directory
 * 
 * Flag icons are from https://github.com/lipis/flag-icons
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({
  currency,
  country,
  size = config.defaultSize,
  ratio = 'square',
  alt,
  className = '',
  style = {},
  'data-testid': testId = 'flag',
}) => {
  // Determine the country code from the currency code if not directly provided
  let countryCode = undefined;
  
  if (country) {
    // For direct country codes, just validate length
    countryCode = country.length === 2 ? country.toLowerCase() : undefined;
  } else if (currency) {
    // For currency codes, check the mapping
    countryCode = currencyToCountry[currency.toUpperCase()]?.toLowerCase();
  }
  
  if (!countryCode) {
    console.warn('No country code found');
    return null;
  }

  // Generate alt text if not provided
  // Prioritize country code for alt text if it was directly provided
  const flagAlt = alt || (country ? `Flag for ${country.toUpperCase()}` : `Flag for ${currency}`);

  // Map the user-friendly ratio terms to the folder structure
  const ratioFolder = ratio === 'square' ? '1x1' : '4x3';
  
  // Use relative path to the assets folder
  const flagPath = `/node_modules/currency-code-to-country-flag/dist/assets/flags/${ratioFolder}/${countryCode}.svg`;
  
  return (
    <img
      data-testid={testId}
      src={flagPath}
      alt={flagAlt}
      width={ratio === 'square' ? size : Math.round(Number(size) * 1.33)}
      height={size}
      className={`country-flag ${className}`.trim()}
      style={{ ...style }}
    />
  );
};

export default CountryFlag;