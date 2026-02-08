import isEmail from "validator/lib/isEmail";

/**
 * Validates an email address format.
 */
export const checkEmail = (email: string): boolean => {
  return isEmail(email);
};

/**
 * Simple function to unescape characters
 *
 * @param html - the html body
 * @returns html with espaced characters unescaped
 */
export const decodeHtml = (html: string) => {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};
