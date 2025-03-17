// Flag sizes available
export type FlagSize = '16' | '24' | '32' | '48' | '64';

// Flag aspect ratios
export type FlagRatio = 'square' | 'rectangle';

// Configuration for the CountryFlag component
export const config = {
  // Default flag size
  defaultSize: '32' as FlagSize,
  
  // Default flag ratio
  defaultRatio: 'square' as FlagRatio,
};