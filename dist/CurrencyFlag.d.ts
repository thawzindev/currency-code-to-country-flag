import React from 'react';
import { FlagSize } from './config';
export interface CurrencyFlagProps {
    /** ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY') */
    currency?: string;
    /** ISO 3166-1 alpha-2 country code (e.g., 'US', 'DE', 'JP') */
    country?: string;
    /** Flag size (16, 24, 32, 48, or 64 pixels) */
    size?: FlagSize;
    /** Custom alt text for the flag image */
    alt?: string;
    /** Additional CSS class names */
    className?: string;
    /** Additional inline styles */
    style?: React.CSSProperties;
}
/**
 * CurrencyFlag component displays a country flag based on currency code or country code
 * using flagcdn.com as the flag provider
 */
export declare const CurrencyFlag: React.FC<CurrencyFlagProps>;
export default CurrencyFlag;
