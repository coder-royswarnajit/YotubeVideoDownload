/**
 * Formats a date as a string
 * @param date The date to format
 * @param format The format to use (default: 'MM/DD/YYYY')
 * @returns The formatted date string
 */
export function formatDate(date: Date | string | number, format: string = 'MM/DD/YYYY'): string {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return 'Invalid Date';
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * Returns a relative time string (e.g. "5 minutes ago")
 * @param date The date to format
 * @param baseDate The reference date (default: now)
 * @returns The relative time string
 */
export function getRelativeTime(
  date: Date | string | number,
  baseDate: Date | string | number = new Date()
): string {
  const d = new Date(date);
  const b = new Date(baseDate);
  
  if (isNaN(d.getTime()) || isNaN(b.getTime())) {
    return 'Invalid Date';
  }
  
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diffInMs = d.getTime() - b.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = 
    d.getMonth() - b.getMonth() + (d.getFullYear() - b.getFullYear()) * 12;
  const diffInYears = Math.floor(diffInDays / 365);
  
  if (Math.abs(diffInSecs) < 60) {
    return rtf.format(diffInSecs, 'second');
  } else if (Math.abs(diffInMins) < 60) {
    return rtf.format(diffInMins, 'minute');
  } else if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, 'hour');
  } else if (Math.abs(diffInDays) < 30) {
    return rtf.format(diffInDays, 'day');
  } else if (Math.abs(diffInMonths) < 12) {
    return rtf.format(diffInMonths, 'month');
  } else {
    return rtf.format(diffInYears, 'year');
  }
}

/**
 * Converts a date to ISO 8601 format
 * @param date The date to convert
 * @returns The ISO date string
 */
export function toISOString(date: Date | string | number): string {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return 'Invalid Date';
  }
  
  return d.toISOString();
}

/**
 * Adds a specified amount of time to a date
 * @param date The starting date
 * @param amount The amount to add
 * @param unit The unit of time to add
 * @returns The new date
 */
export function addTime(
  date: Date | string | number,
  amount: number,
  unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
): Date {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error('Invalid Date');
  }
  
  switch (unit) {
    case 'year':
      d.setFullYear(d.getFullYear() + amount);
      break;
    case 'month':
      d.setMonth(d.getMonth() + amount);
      break;
    case 'day':
      d.setDate(d.getDate() + amount);
      break;
    case 'hour':
      d.setHours(d.getHours() + amount);
      break;
    case 'minute':
      d.setMinutes(d.getMinutes() + amount);
      break;
    case 'second':
      d.setSeconds(d.getSeconds() + amount);
      break;
  }
  
  return d;
}

/**
 * Checks if a date is between two other dates
 * @param date The date to check
 * @param startDate The start date
 * @param endDate The end date
 * @param inclusivity Whether to include the start and end dates
 * @returns Whether the date is between the start and end dates
 */
export function isBetween(
  date: Date | string | number,
  startDate: Date | string | number,
  endDate: Date | string | number,
  inclusivity: '()' | '[]' | '[)' | '(]' = '[]'
): boolean {
  const d = new Date(date).getTime();
  const s = new Date(startDate).getTime();
  const e = new Date(endDate).getTime();
  
  if (isNaN(d) || isNaN(s) || isNaN(e)) {
    throw new Error('Invalid Date');
  }
  
  switch (inclusivity) {
    case '()':
      return d > s && d < e;
    case '[]':
      return d >= s && d <= e;
    case '[)':
      return d >= s && d < e;
    case '(]':
      return d > s && d <= e;
    default:
      throw new Error('Invalid inclusivity parameter');
  }
}