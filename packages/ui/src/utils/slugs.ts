/**
 * Generates a URL-friendly slug from the provided text.
 * @param text - The input text to be slugified.
 * @returns A string in lowercase with spaces replaced by hyphens.
 */
export const generateSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
    