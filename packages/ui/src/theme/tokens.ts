/**
 * Design Tokens (TypeScript)
 * Programmatic access to design system colors and tokens
 * Use this when you need to access token values in JavaScript/TypeScript
 */

export const primitives = {
  // Base Colors
  white: '#ffffff',
  black: '#000000',
  sugar: '#fffcf3',

  // Primary Teal
  teal: {
    50: '#ccd9d8',
    100: '#abbfbe',
    200: '#809f9e',
    300: '#56807e',
    400: '#2c605d',
    500: '#02403d',
    600: '#023533',
    700: '#012b29',
    800: '#01201f',
    900: '#011514',
    1000: '#000d0c',
  },

  // Secondary Kiwi
  kiwi: {
    50: '#ebfcdb',
    100: '#defac4',
    200: '#cef8a6',
    300: '#bef688',
    400: '#adf36b',
    500: '#9df14d',
    600: '#83c940',
    700: '#69a133',
    800: '#4f7927',
    900: '#34501a',
    1000: '#1f300f',
  },

  // Accent Lavender
  lavender: {
    50: '#f1e1fc',
    100: '#e8ccfa',
    200: '#ddb3f8',
    300: '#d29af6',
    400: '#c680f3',
    500: '#bb67f1',
    600: '#9c56c9',
    700: '#7d45a1',
    800: '#5e3479',
    900: '#3e2250',
    1000: '#251530',
  },

  // Accent Peach
  peach: {
    50: '#fff6f1',
    100: '#fff0e8',
    200: '#ffe8dc',
    300: '#ffe1d1',
    400: '#ffd9c5',
    500: '#ffd2ba',
    600: '#d4af9b',
    700: '#aa8c7c',
    800: '#80695d',
    900: '#55463e',
    1000: '#332a25',
  },

  // Tertiary Violet
  violet: {
    50: '#d4cddf',
    100: '#b7abc9',
    200: '#9281ae',
    300: '#6e5793',
    400: '#4a2d78',
    500: '#26035d',
    600: '#20034e',
    700: '#19023e',
    800: '#13022f',
    900: '#0d011f',
    1000: '#080113',
  },

  // Neutrals
  neutral: {
    50: '#f3f6f7',
    100: '#e7ecee',
    200: '#dee2e4',
    300: '#d2d8db',
    400: '#c2c7c9',
    500: '#b6bbbe',
    600: '#aaafb2',
    700: '#9ea3a7',
    800: '#909598',
    900: '#767d81',
    1000: '#575f64',
  },

  // Error
  error: {
    50: '#feeced',
    100: '#fcd9da',
    200: '#f9b8ba',
    300: '#f88289',
    400: '#ff6372',
    500: '#ff425f',
    600: '#f33c59',
    700: '#e63853',
    800: '#d5304c',
    900: '#bd2641',
  },

  // Warning
  warning: {
    50: '#fefaec',
    100: '#fdf7dd',
    200: '#fbf0c2',
    300: '#fceba4',
    400: '#fee889',
    500: '#ffe573',
    600: '#f9d36c',
    700: '#f1be65',
    800: '#eaa95c',
    900: '#e08449',
  },

  // Success
  success: {
    50: '#ecfdf3',
    100: '#d1fadf',
    200: '#a6f4c5',
    300: '#6ce9a6',
    400: '#32d583',
    500: '#12b76a',
    600: '#039855',
    700: '#027a48',
    800: '#05603a',
    900: '#142a20',
  },

  // Alpha Colors
  alpha: {
    lavender: '#f1e1fc33',
    violet: '#bb67f133',
    teal: '#02403d33',
    kiwi: '#9df14d33',
    error: '#ff637233',
    warning: '#ffe57333',
  },
} as const;

/**
 * Semantic tokens for light theme
 */
export const lightTheme = {
  text: {
    heading: primitives.teal[900],
    body: primitives.teal[500],
    eyebrow: primitives.teal[500],
    link: primitives.teal[500],
    linkHover: primitives.teal[800],
    hyperlink: primitives.kiwi[500],
    hyperlinkHover: primitives.black,
    button: primitives.kiwi[500],
    buttonHover: primitives.white,
    secondaryButton: primitives.teal[500],
    disabled: primitives.teal[500],
    placeholder: primitives.teal[600],
    success: primitives.success[700],
    warning: primitives.warning[700],
    error: primitives.error[700],
  },
  surface: {
    background: primitives.sugar,
    secondaryBackground: primitives.white,
    card: primitives.white,
    button: primitives.teal[500],
    buttonHover: primitives.teal[800],
    secondaryButton: primitives.sugar,
    secondaryButtonHover: primitives.peach[100],
    navbar: primitives.sugar,
    navlinkActive: '#00000005',
    disabled: '#00000005',
    eyebrow: primitives.alpha.teal,
    accordionDefault: primitives.white,
    accordionSelected: primitives.kiwi[50],
    ctaBar: primitives.alpha.lavender,
    input: primitives.white,
    tableCell: '#00000005',
  },
  icon: {
    primary: primitives.lavender[500],
    button: primitives.kiwi[500],
    buttonHover: primitives.white,
    link: primitives.teal[500],
    linkHover: primitives.kiwi[500],
    success: primitives.success[700],
    warning: primitives.warning[700],
    error: primitives.error[700],
    disabled: primitives.teal[500],
    breadcrumb: primitives.neutral[800],
    contained: primitives.white,
  },
  border: {
    primary: primitives.teal[200],
    secondary: '#0000000c',
    secondaryButton: primitives.teal[500],
    error: primitives.error[800],
    input: primitives.neutral[400],
    tableOfContents: primitives.kiwi[500],
  },
} as const;

/**
 * Semantic tokens for dark theme
 */
export const darkTheme = {
  text: {
    heading: primitives.white,
    body: primitives.sugar,
    eyebrow: primitives.kiwi[500],
    link: primitives.kiwi[500],
    linkHover: primitives.kiwi[200],
    hyperlink: primitives.kiwi[200],
    hyperlinkHover: primitives.kiwi[100],
    button: primitives.teal[1000],
    buttonHover: primitives.violet[900],
    secondaryButton: primitives.sugar,
    disabled: primitives.teal[600],
    placeholder: primitives.teal[400],
    success: primitives.success[200],
    warning: primitives.warning[200],
    error: primitives.error[300],
  },
  surface: {
    background: primitives.teal[1000],
    secondaryBackground: primitives.violet[900],
    card: primitives.alpha.teal,
    button: primitives.kiwi[500],
    buttonHover: primitives.kiwi[200],
    secondaryButton: primitives.teal[800],
    secondaryButtonHover: primitives.alpha.teal,
    navbar: primitives.sugar,
    navlinkActive: primitives.alpha.violet,
    disabled: '#ffffff0c',
    eyebrow: primitives.alpha.teal,
    accordionDefault: '#0000000c',
    accordionSelected: primitives.alpha.lavender,
    ctaBar: primitives.alpha.kiwi,
    input: '#ffffff33',
    tableCell: '#ffffff0c',
  },
  icon: {
    primary: primitives.lavender[500],
    button: primitives.teal[500],
    buttonHover: primitives.violet[900],
    link: primitives.kiwi[500],
    linkHover: primitives.kiwi[200],
    success: primitives.success[200],
    warning: primitives.warning[300],
    error: primitives.error[300],
    disabled: primitives.teal[300],
    breadcrumb: primitives.teal[100],
    contained: primitives.white,
  },
  border: {
    primary: primitives.teal[300],
    secondary: '#ffffff33',
    secondaryButton: primitives.sugar,
    error: primitives.error[800],
    input: primitives.neutral[500],
    tableOfContents: primitives.peach[500],
  },
} as const;

/**
 * Helper function to get theme values
 */
export function getThemeColor(
  theme: 'light' | 'dark',
  category: keyof typeof lightTheme,
  token: string
): string {
  const themeObj = theme === 'light' ? lightTheme : darkTheme;
  const categoryObj = themeObj[category] as Record<string, string>;
  return categoryObj[token] || primitives.black;
}

/**
 * Export all tokens for convenience
 */
export const tokens = {
  primitives,
  light: lightTheme,
  dark: darkTheme,
  getThemeColor,
} as const;

export default tokens;
