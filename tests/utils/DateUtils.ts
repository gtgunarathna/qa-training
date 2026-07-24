/**
 * Date Utilities
 * Provides helper functions for date operations in tests
 */
export class DateUtils {
  /**
   * Get today's date in YYYY-MM-DD format
   */
  static getTodayDate(): string {
    return this.formatDate(new Date());
  }

  /**
   * Get tomorrow's date in YYYY-MM-DD format
   */
  static getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return this.formatDate(tomorrow);
  }

  /**
   * Get a date N days in the future
   * @param days - Number of days in the future
   */
  static getDateInFuture(days: number): string {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return this.formatDate(futureDate);
  }

  /**
   * Get a date N days in the past
   * @param days - Number of days in the past
   */
  static getDateInPast(days: number): string {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - days);
    return this.formatDate(pastDate);
  }

  /**
   * Format date to YYYY-MM-DD
   * @param date - Date object
   */
  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get date exactly 1 year in future
   */
  static getOneYearInFutureDate(): string {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    return this.formatDate(futureDate);
  }

  /**
   * Check if date is valid
   * @param dateString - Date in YYYY-MM-DD format
   */
  static isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }
}
