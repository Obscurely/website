import isEmail from "validator/lib/isEmail";

/**
 * Validates an email address format.
 */
export const checkEmail = (email: string): boolean => {
  return isEmail(email);
};
