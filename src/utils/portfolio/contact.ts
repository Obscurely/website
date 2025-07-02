const emailRegex =
  /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}\.?$/;

/**
 * Validates an email address format.
 */
export const checkEmail = (email: string): boolean => {
  return emailRegex.test(email);
};
