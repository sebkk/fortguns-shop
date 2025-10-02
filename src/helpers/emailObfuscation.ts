/**
 * Utility functions for email obfuscation to protect against bots
 */

/**
 * Obfuscates an email address by reversing it and encoding with base64
 * @param email - The email address to obfuscate
 * @returns The obfuscated email string
 */
export const obfuscateEmail = (email: string): string => {
  return btoa(email.split('').reverse().join(''));
};

/**
 * Deobfuscates an email address by decoding base64 and reversing it
 * @param obfuscatedEmail - The obfuscated email string
 * @returns The original email address
 */
export const deobfuscateEmail = (obfuscatedEmail: string): string => {
  try {
    // First decode base64, then reverse the result
    const decoded = atob(obfuscatedEmail);
    return decoded.split('').reverse().join('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    // Fallback to simple base64 decoding
    return atob(obfuscatedEmail);
  }
};

/**
 * Checks if a string is a valid email address
 * @param email - The string to validate
 * @returns True if the string is a valid email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
