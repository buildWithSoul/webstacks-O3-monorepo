// import { PortableTextBlock } from "next-sanity";

const wordSeparators = /[-_\\.+\s]+/g,
  notAlphaNumericOrSpace = /[^ a-zA-Z0-9]+/g,
  notAlphaNumericSpaceOrDash = /[^ a-zA-Z0-9-]/g,
  capitalizedFirstLetter = /[A-Z]+(?![a-z])|[A-Z]/g;

/**
 * Safely camelCases a string, taking into account acronyms, kebab-case, snake_case, and sentence casing as well as special characters
 * @param string
 * @returns A `string` in camelCase form
 */
export const sentenceToCamelCase = (string: string): string =>
  string
    .replace(wordSeparators, ' ')
    .replace(notAlphaNumericOrSpace, '')
    .toLowerCase()
    .replace(capitalizedFirstLetter, ($, ofs) => (ofs ? ' ' : '') + $.trim())
    .trim()
    .split(' ')
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');

/**
 * Safely kebab-cases a string, taking into account acronyms, camelCase, snake_case, and sentence casing, as well as special characters
 * @param string
 * @returns a kebab-cased string
 */
export const sentenceToKebabCase = (str: string) =>
  str
    .trim()
    .replace(wordSeparators, ' ')
    .replace(notAlphaNumericSpaceOrDash, ' ')
    .replace(capitalizedFirstLetter, ($, ofs) => (ofs ? '-' : '') + $.trim().toLowerCase())
    .trim()
    .split(' ')
    .join('-')
    .replace(/--+/g, '-');

/**
 * Converts a camelCase string to a title-cased string.
 *
 * @param str - The input string in camelCase.
 * @returns The input string converted to title case.
 */
export const camelToTitleCase = (str: string): string => {
  const spaced = str
    .replace(/([A-Z])/g, ' $1')
    .replace(/\s+/g, ' ')
    .trim();

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

/**
 * Converts a kebab-case string to a title-cased string.
 *
 * @param str - The input string in kebab-case.
 * @returns The input string converted to title case.
 */
export const kebabToTitleCase = (str: string): string => {
  return str
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// export const blocksToText = (blocks: PortableTextBlock[] | any) => {
//   // Handle non-array inputs or undefined
//   if (!blocks || !Array.isArray(blocks)) {
//     return typeof blocks === 'string' ? blocks : '';
//   }
  
//   const options = Object.assign({}, {nonTextBehavior: 'remove'})
//   return blocks
//     .map(block => {
//       if (block._type !== 'block' || !block.children) {
//         return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
//       }

//       return block.children.map((child: {text: string}) => child.text).join('')
//     })
//     .join('\n\n')
// }

// Remove zero-width and formatting characters that may be injected by Sanity stega/visual editing
// Includes: ZWSP/ZWNJ/ZWJ, BOM, Word Joiner, Directional marks, and isolate marks
const ZERO_WIDTH_AND_FORMATTING_CHARS = /[\u200B-\u200D\uFEFF\u2060\u2061\u2062\u2063\u2064\u202A-\u202E\u2066-\u2069]/g

/**
 * Strips invisible stega/formatting characters from a string to make it safe for URLs, paths, and comparisons
 */
export const cleanStega = (str: string = ''): string => {
  return str.replace(ZERO_WIDTH_AND_FORMATTING_CHARS, '')
}

export const toSentenceCase = (str?: string) => {
  if (!str || typeof str !== 'string') return '';

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
