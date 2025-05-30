/**
 * Formats a number as currency
 * @param value The number to format
 * @param currency The currency code (default: 'USD')
 * @param locale The locale (default: 'en-US')
 * @returns The formatted currency string
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a number with thousands separators
 * @param value The number to format
 * @param locale The locale (default: 'en-US')
 * @param options Additional number format options
 * @returns The formatted number string
 */
export function formatNumber(
  value: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Formats a number as a percentage
 * @param value The number to format (0-1)
 * @param locale The locale (default: 'en-US')
 * @param decimals The number of decimal places (default: 2)
 * @returns The formatted percentage string
 */
export function formatPercentage(
  value: number,
  locale: string = 'en-US',
  decimals: number = 2
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Truncates a string if it's longer than the specified length
 * @param text The string to truncate
 * @param length The maximum length (default: 50)
 * @param suffix The suffix to add (default: '...')
 * @returns The truncated string
 */
export function truncateText(
  text: string,
  length: number = 50,
  suffix: string = '...'
): string {
  if (text.length <= length) {
    return text;
  }
  
  return text.substring(0, length - suffix.length) + suffix;
}

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes The file size in bytes
 * @param decimals The number of decimal places (default: 2)
 * @returns The formatted file size string
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Converts a string to title case
 * @param text The string to convert
 * @returns The title case string
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Pluralizes a word based on a count
 * @param count The count
 * @param singular The singular form
 * @param plural The plural form (optional)
 * @returns The pluralized word
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  if (!plural) {
    plural = singular + 's';
  }
  
  return count === 1 ? singular : plural;
}

/**
 * Formats a phone number to a standard format
 * @param phone The phone number
 * @param format The format (default: '(xxx) xxx-xxxx')
 * @returns The formatted phone number
 */
export function formatPhoneNumber(
  phone: string,
  format: string = '(xxx) xxx-xxxx'
): string {
  const cleaned = ('' + phone).replace(/\D/g, '');
  
  if (cleaned.length === 0) {
    return '';
  }
  
  let result = format;
  
  for (let i = 0; i < cleaned.length && i < format.replace(/[^x]/g, '').length; i++) {
    result = result.replace('x', cleaned[i]);
  }
  
  result = result.replace(/x/g, '');
  
  return result;
}