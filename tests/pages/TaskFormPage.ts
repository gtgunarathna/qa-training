import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Task Form Page Object
 * Handles interactions with the task form component
 * Follows Interface Segregation Principle - focused on form operations
 */
export class TaskFormPage extends BasePage {
  // Robust locators using accessible selectors (getByRole preferred)
  readonly taskNameInput = this.page.getByLabel('Title');
  readonly taskDescriptionInput = this.page.getByLabel('Description');
  readonly dueDateInput = this.page.getByLabel('Due Date');
  readonly dueTimeInput = this.page.getByLabel('Due Time');
  readonly statusSelect = this.page.getByLabel('Status');
  readonly addButton = this.page.getByRole('button', { name: /Add Task/i });
  readonly formHeading = this.page.getByRole('heading', { name: /Add a New Task/i });
  readonly errorMessages = this.page.locator('[role="alert"]');
  readonly successMessage = this.page.locator('div.success, [role="status"].success');
  readonly formResetButton = this.page.getByRole('button', { name: /Reset/i });

  constructor(page: Page) {
    super(page);
  }

  /**
   * Enter task name
   * @param taskName - The task name to enter
   */
  async enterTaskName(taskName: string): Promise<void> {
    await this.taskNameInput.fill(taskName);
  }

  /**
   * Enter task description
   * @param description - The description to enter
   */
  async enterTaskDescription(description: string): Promise<void> {
    await this.taskDescriptionInput.fill(description);
  }

  /**
   * Set due date
   * @param date - The date in format YYYY-MM-DD
   */
  async setDueDate(date: string): Promise<void> {
    await this.dueDateInput.fill(date);
  }

  /**
   * Set due time
   * @param time - The time in format HH:MM
   */
  async setDueTime(time: string): Promise<void> {
    await this.dueTimeInput.fill(time);
  }

  /**
   * Set task status
   * @param status - The status value (e.g., "Pending", "In Progress", "Done")
   */
  async setStatus(status: string): Promise<void> {
    await this.statusSelect.selectOption(status);
  }

  /**
   * Click the Add Task button
   */
  async clickAddButton(): Promise<void> {
    await this.addButton.click();
  }

  /**
   * Fill complete form and submit
   * @param taskData - Object containing task details
   */
  async fillAndSubmitForm(taskData: {
    name: string;
    description?: string;
    dueDate: string;
    dueTime?: string;
    status?: string;
  }): Promise<void> {
    await this.enterTaskName(taskData.name);
    
    if (taskData.description) {
      await this.enterTaskDescription(taskData.description);
    }
    
    await this.setDueDate(taskData.dueDate);

    if (taskData.dueTime) {
      await this.setDueTime(taskData.dueTime);
    }

    if (taskData.status) {
      await this.setStatus(taskData.status);
    }

    await this.clickAddButton();
  }

  /**
   * Get error messages
   */
  async getErrorMessages(): Promise<string[]> {
    return await this.errorMessages.allTextContents();
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessages.isVisible().catch(() => false);
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    return await this.successMessage.textContent() ?? '';
  }

  /**
   * Check if form is visible
   */
  async isFormVisible(): Promise<boolean> {
    return await this.formHeading.isVisible().catch(() => false);
  }

  /**
   * Wait for form to be loaded
   */
  async waitForFormToLoad(): Promise<void> {
    await this.formHeading.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }

  /**
   * Reset form to initial state
   */
  async resetForm(): Promise<void> {
    const isVisible = await this.formResetButton.isVisible().catch(() => false);
    if (isVisible) {
      await this.formResetButton.click();
    }
  }

  /**
   * Clear all form fields
   */
  async clearAllFields(): Promise<void> {
    await this.taskNameInput.clear();
    await this.taskDescriptionInput.clear();
    await this.dueDateInput.clear();
    await this.dueTimeInput.clear();
  }

  /**
   * Get task name input value
   */
  async getTaskNameValue(): Promise<string> {
    return await this.taskNameInput.inputValue();
  }

  /**
   * Get task description input value
   */
  async getTaskDescriptionValue(): Promise<string> {
    return await this.taskDescriptionInput.inputValue();
  }

  /**
   * Get due date input value
   */
  async getDueDateValue(): Promise<string> {
    return await this.dueDateInput.inputValue();
  }

  /**
   * Get due time input value
   */
  async getDueTimeValue(): Promise<string> {
    return await this.dueTimeInput.inputValue();
  }
}
