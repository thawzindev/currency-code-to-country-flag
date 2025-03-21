import React from 'react';
import { render, screen } from '@testing-library/react';
import { CountryFlag } from './CountryFlag';

// Mock the currencyToCountry mapping
jest.mock('./currencyToCountry', () => ({
  currencyToCountry: {
    'USD': 'US',
    'EUR': 'EU',
    'JPY': 'JP',
    'GBP': 'GB',
    'CNY': 'CN',
    'LAK': 'LA',
    'THB': 'TH',
    'MMK': 'MM'
  }
}));

// Mock the internal SVG path handling
jest.mock('./CountryFlag', () => {
  const originalModule = jest.requireActual('./CountryFlag');
  
  // Create a copy of the original component but with mocked SVG path handling
  const ComponentWithMockedSVG = (props: any) => {
    const Component = originalModule.CountryFlag;
    // Override props to add testId for easier testing
    return <Component {...props} data-testid={props['data-testid'] || 'flag'} />;
  };

  return {
    ...originalModule,
    CountryFlag: ComponentWithMockedSVG,
  };
});

describe('CountryFlag Component', () => {
  // Test rendering with country code
  test('renders correctly with country code', () => {
    render(<CountryFlag country="us" />);
    
    const flagElement = screen.getByTestId('flag');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement.tagName).toBe('IMG');
    expect(flagElement).toHaveAttribute('alt', expect.stringContaining('Flag for US'));
  });
  
  // Test rendering with currency code
  test('renders correctly with currency code', () => {
    render(<CountryFlag currency="USD" />);
    
    const flagElement = screen.getByTestId('flag');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveAttribute('alt', expect.stringContaining('Flag for USD'));
  });

  // Test with different sizes
  test('applies the correct size', () => {
    render(<CountryFlag country="us" size="48" />);
    
    const flagElement = screen.getByTestId('flag');
    expect(flagElement).toHaveAttribute('width', '48');
    expect(flagElement).toHaveAttribute('height', '48');
  });

  // Test square ratio
  test('renders with square ratio correctly', () => {
    render(<CountryFlag country="us" ratio="square" />);
    
    const flagElement = screen.getByTestId('flag');
    
    // For square ratio, width and height should be the same
    const width = flagElement.getAttribute('width');
    const height = flagElement.getAttribute('height');
    expect(width).toBe(height);
  });

  // Test rectangle ratio
  test('renders with rectangle ratio correctly', () => {
    render(<CountryFlag country="us" ratio="rectangle" size="32" />);
    
    const flagElement = screen.getByTestId('flag');
    
    // For rectangle ratio, width should be 1.33 times the height
    const width = flagElement.getAttribute('width');
    const height = flagElement.getAttribute('height');
    expect(Number(width)).toBeCloseTo(Number(height) * 1.33, 0);
  });

  // Test custom class name
  test('applies custom class name', () => {
    render(<CountryFlag country="us" className="custom-class" />);
    
    const flagElement = screen.getByTestId('flag');
    expect(flagElement).toHaveClass('country-flag');
    expect(flagElement).toHaveClass('custom-class');
  });

  // Test custom style
  test('applies custom style', () => {
    render(<CountryFlag country="us" style={{ margin: '10px' }} />);
    
    const flagElement = screen.getByTestId('flag');
    expect(flagElement).toHaveStyle('margin: 10px');
  });

  // Test custom alt text
  test('applies custom alt text', () => {
    render(<CountryFlag country="us" alt="Custom alt text" />);
    
    const flagElement = screen.getByTestId('flag');
    expect(flagElement).toHaveAttribute('alt', 'Custom alt text');
  });

  // Test case insensitivity for country code
  test('handles case-insensitive country codes', () => {
    render(<CountryFlag country="US" />);
    const flagElement = screen.getByTestId('flag');
    expect(flagElement).toBeInTheDocument();
  });

  // Tests for specific currency codes from requirements
  describe('Specific currency codes from requirements', () => {
    test('renders Myanmar flag with MM country code', () => {
      render(<CountryFlag country="MM" />);
      const flagElement = screen.getByTestId('flag');
      expect(flagElement).toBeInTheDocument();
      expect(flagElement).toHaveAttribute('alt', expect.stringContaining('Flag for MM'));
    });

    test('renders Laos flag with LAK currency code', () => {
      render(<CountryFlag currency="LAK" />);
      const flagElement = screen.getByTestId('flag');
      expect(flagElement).toBeInTheDocument();
      expect(flagElement).toHaveAttribute('alt', expect.stringContaining('Flag for LAK'));
    });

    test('renders Thailand flag with THB currency code', () => {
      render(<CountryFlag currency="THB" />);
      const flagElement = screen.getByTestId('flag');
      expect(flagElement).toBeInTheDocument();
      expect(flagElement).toHaveAttribute('alt', expect.stringContaining('Flag for THB'));
    });

    test('renders China flag with CNY currency code', () => {
      render(<CountryFlag currency="CNY" />);
      const flagElement = screen.getByTestId('flag');
      expect(flagElement).toBeInTheDocument();
      expect(flagElement).toHaveAttribute('alt', expect.stringContaining('Flag for CNY'));
    });
  });

  describe('Type constraints and error handling', () => {
    beforeEach(() => {
      // Spy on console.warn
      jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      // Restore console.warn
      jest.restoreAllMocks();
    });

    test('returns null and warns when no country or currency is found', () => {
      const { container } = render(<CountryFlag currency="INVALID" />);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('No country code found')
      );
      expect(container.firstChild).toBeNull();
    });

    test('returns null and warns when invalid country code is provided', () => {
      const { container } = render(<CountryFlag country="INVALID" />);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('No country code found')
      );
      expect(container.firstChild).toBeNull();
    });

    test('handles undefined values gracefully', () => {
      const { container } = render(<CountryFlag country={undefined as any} />);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('No country code found')
      );
      expect(container.firstChild).toBeNull();
    });

    test('handles empty string values', () => {
      const { container } = render(<CountryFlag country="" />);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('No country code found')
      );
      expect(container.firstChild).toBeNull();
    });

    // TypeScript compile-time tests (these won't run, but will be checked by TypeScript)
    // @ts-expect-error - Should error when neither country nor currency is provided
    render(<CountryFlag />);

    // Remove the invalid test case for both props
    // Add separate test cases for country and currency priority
    test('renders correctly with country code', () => {
      render(<CountryFlag country="gb" />);
      const flagElement = screen.getByTestId('flag');
      expect(flagElement).toHaveAttribute('alt', expect.stringContaining('Flag for GB'));
    });

    test('renders correctly with currency code', () => {
      render(<CountryFlag currency="GBP" />);
      const flagElement = screen.getByTestId('flag');
      expect(flagElement).toHaveAttribute('alt', expect.stringContaining('Flag for GBP'));
    });
  });
});