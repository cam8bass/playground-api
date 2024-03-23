/**
 * @description Capitalizes the first letter of a string.
 * @param {string} sentence - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export function capitalizeFirstLetter(sentence: string): string {
  return sentence.replace(/(^\w|\.\s*\w)/g, (match) => match.toUpperCase())
}
