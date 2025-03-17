import React from 'react';
import { FlagSize } from './config';
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
};
type CurrencyProp = {
    /** ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY') */
    currency: string;
    country?: never;
};
type CountryProp = {
    /** ISO 3166-1 alpha-2 country code (e.g., 'US', 'DE', 'JP') */
    country: string;
    currency?: never;
};
export type CountryFlagProps = BaseCountryFlagProps & (CurrencyProp | CountryProp);
/**
 * CountryFlag component displays a country flag based on currency code or country code
 * using local flag SVG files from assets/flags directory
 *
 * Flag icons are from https://github.com/lipis/flag-icons
 */
export declare const CountryFlag: React.FC<CountryFlagProps>;
export default CountryFlag;
