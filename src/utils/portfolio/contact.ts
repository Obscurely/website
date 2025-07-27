import validator from "validator";

/**
 * Validates an email address format.
 */
export const checkEmail = (email: string): boolean => {
  return validator.isEmail(email);
};
