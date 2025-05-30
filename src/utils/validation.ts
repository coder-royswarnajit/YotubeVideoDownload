/**
 * Validates an email address
 * @param email The email to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant regex for email validation
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

/**
 * Validates a password strength
 * @param password The password to validate
 * @param options Password validation options
 * @returns An object with the validation result and any error messages
 */
export function validatePassword(
  password: string,
  options = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  }
): { 
  isValid: boolean; 
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} {
  const errors: string[] = [];
  
  // Check minimum length
  if (password.length < options.minLength) {
    errors.push(`Password must be at least ${options.minLength} characters long`);
  }
  
  // Check for uppercase letters
  if (options.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  // Check for lowercase letters
  if (options.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  // Check for numbers
  if (options.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Check for special characters
  if (options.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Determine password strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  
  if (password.length >= options.minLength) {
    let score = 0;
    
    // Length bonus
    score += Math.min(2, Math.floor(password.length / 4));
    
    // Character variety bonus
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
    
    // Assign strength based on score
    if (score >= 5) {
      strength = 'strong';
    } else if (score >= 3) {
      strength = 'medium';
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Validates a URL
 * @param url The URL to validate
 * @returns Whether the URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates a phone number
 * @param phone The phone number to validate
 * @param countryCode The country code (default: 'US')
 * @returns Whether the phone number is valid
 */
export function isValidPhone(phone: string, countryCode: string = 'US'): boolean {
  // This is a simple validation for US phone numbers
  // In a real app, you'd use a library like libphonenumber-js for proper validation
  if (countryCode === 'US') {
    // US phone number: 10 digits, optionally preceded by +1
    const usPhoneRegex = /^(\+1)?[0-9]{10}$/;
    return usPhoneRegex.test(phone.replace(/\D/g, ''));
  }
  
  // For other countries, just check if it has digits
  return /\d/.test(phone);
}

/**
 * Validates a credit card number using the Luhn algorithm
 * @param cardNumber The credit card number to validate
 * @returns Whether the credit card number is valid
 */
export function isValidCreditCard(cardNumber: string): boolean {
  // Remove spaces and dashes
  const digits = cardNumber.replace(/[\s-]/g, '');
  
  // Check if contains only digits
  if (!/^\d+$/.test(digits)) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
}

/**
 * Validates if a value is a number
 * @param value The value to validate
 * @returns Whether the value is a number
 */
export function isNumber(value: any): boolean {
  if (typeof value === 'number') {
    return !isNaN(value);
  }
  if (typeof value !== 'string') {
    return false;
  }
  return !isNaN(Number(value));
}

/**
 * Validates if a value is within a range
 * @param value The value to validate
 * @param min The minimum value
 * @param max The maximum value
 * @returns Whether the value is within the range
 */
export function isWithinRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}