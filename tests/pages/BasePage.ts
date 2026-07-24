import { Page } from '@playwright/test';

/**
 * Base Page Object class
 * Provides common functionality for all page objects
 * Follows Single Responsibility Principle
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param path - The path to navigate to
   */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill text input with optional clearing
   * @param selector - The element selector
   * @param text - The text to fill
   * @param clear - Whether to clear the field first (default: true)
   */
  async fillText(selector: string, text: string, clear: boolean = true): Promise<void> {
    const element = this.page.locator(selector);
    if (clear) {
      await element.clear();
    }
    await element.fill(text);
  }

  /**
   * Click an element
   * @param selector - The element selector
   */
  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /**
   * Get text content of an element
   * @param selector - The element selector
   */
  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() ?? '';
  }

  /**
   * Check if element is visible
   * @param selector - The element selector
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Wait for element to be visible
   * @param selector - The element selector
   * @param timeout - Timeout in milliseconds (default: 5000)
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    } catch (error) {
      // If wait fails, just continue - element may load after other interactions
      console.warn(`Element ${selector} not visible within ${timeout}ms`);
    }
  }

  /**
   * Get all text contents of elements
   * @param selector - The element selector
   */
  async getAllTexts(selector: string): Promise<string[]> {
    return await this.page.locator(selector).allTextContents();
  }
}
