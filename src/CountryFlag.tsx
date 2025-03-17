import React from 'react';
import { currencyToCountry } from './currencyToCountry';
import { config, FlagSize } from './config';

export interface CountryFlagProps {
  /** ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY') */
  currency?: string;
  /** ISO 3166-1 alpha-2 country code (e.g., 'US', 'DE', 'JP') */
  country?: string;
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
  const countryCode = country?.toLowerCase() || (currency ? currencyToCountry[currency.toUpperCase()]?.toLowerCase() : undefined);
  
  if (!countryCode) {
    console.warn(`CountryFlag: No country code found for currency code "${currency}" or country code "${country}"`);
    return null;
  }

  // Generate alt text if not provided
  // Prioritize country code for alt text if it was directly provided
  const flagAlt = alt || (country ? `Flag for ${country.toUpperCase()}` : `Flag for ${currency}`);

  // Map the user-friendly ratio terms to the folder structure
  const ratioFolder = ratio === 'square' ? '1x1' : '4x3';
  
  try {
    // Dynamic import of SVG file
    const flagSrc = require(`./assets/flags/${ratioFolder}/${countryCode}.svg`).default;
    
    return (
      <img
        data-testid={testId}
        src={flagSrc}
        alt={flagAlt}
        width={ratio === 'square' ? size : Math.round(Number(size) * 1.33)}
        height={size}
        className={`country-flag ${className}`.trim()}
        style={{ ...style }}
      />
    );
  } catch (error) {
    console.warn(`CountryFlag: Failed to load flag for country code "${countryCode}"`);
    return null;
  }
};

export default CountryFlag;