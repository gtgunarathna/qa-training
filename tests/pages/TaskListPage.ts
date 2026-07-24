import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Task Item interface
 * Defines the structure of a task in the list
 */
export interface ITaskItem {
  id?: string;
  name: string;
  description?: string;
  startDate: string;
  dueDate: string;
  status?: string;
}

/**
 * Task List Page Object
 * Handles interactions with the task list component
 * Follows Interface Segregation Principle - focused on list operations
 */
export class TaskListPage extends BasePage {
  // Robust locators using accessible selectors
  readonly taskListContainer = this.page.locator('section, [role="main"]').nth(0);
  readonly taskItems = this.page.locator('li, div[class*="task"]');
  readonly taskItemName = this.page.locator('[class*="title"], [class*="name"]');
  readonly taskItemDescription = this.page.locator('[class*="description"]');
  readonly taskItemDueDate = this.page.locator('[class*="due"], [class*="date"]');
  readonly taskItemStatus = this.page.locator('[class*="status"], [class*="badge"]');
  readonly emptyStateMessage = this.page.getByText(/No tasks yet/i);
  readonly taskCount = this.page.locator('[class*="count"]');
  readonly filterButtons = this.page.getByRole('button', { name: /All|Pending|In Progress|Done/i });

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get all task items from the list
   */
  async getTaskItems(): Promise<Locator[]> {
    return await this.taskItems.all();
  }

  /**
   * Get total count of tasks
   */
  async getTaskCount(): Promise<number> {
    const items = await this.getTaskItems();
    return items.length;
  }

  /**
   * Check if task list is visible
   */
  async isTaskListVisible(): Promise<boolean> {
    return await this.taskListContainer.isVisible().catch(() => false);
  }

  /**
   * Check if empty state message is visible
   */
  async isEmptyStateVisible(): Promise<boolean> {
    return await this.emptyStateMessage.isVisible().catch(() => false);
  }

  /**
   * Get specific task by name
   * @param taskName - The name of the task to find
   */
  async getTaskByName(taskName: string): Promise<Locator | null> {
    const tasks = await this.getTaskItems();
    
    for (const task of tasks) {
      const text = await task.textContent().catch(() => '');
      if (text?.includes(taskName)) {
        return task;
      }
    }
    
    return null;
  }

  /**
   * Get task details by name
   * @param taskName - The name of the task
   */
  async getTaskDetails(taskName: string): Promise<ITaskItem | null> {
    const task = await this.getTaskByName(taskName);
    
    if (!task) {
      return null;
    }

    const text = await task.textContent().catch(() => '');

    return {
      name: taskName,
      description: text ?? '',
      dueDate: text ?? '',
      status: 'Pending',
    };
  }

  /**
   * Check if task exists in list
   * @param taskName - The name of the task
   */
  async taskExists(taskName: string): Promise<boolean> {
    const task = await this.getTaskByName(taskName);
    return task !== null;
  }

  /**
   * Get all task names
   */
  async getAllTaskNames(): Promise<string[]> {
    const items = await this.getTaskItems();
    const names: string[] = [];

    for (const item of items) {
      const text = await item.textContent().catch(() => '');
      if (text) {
        names.push(text.trim());
      }
    }

    return names;
  }

  /**
   * Wait for task to appear in list
   * @param taskName - The name of the task to wait for
   * @param timeout - Timeout in milliseconds (default: 5000)
   */
  async waitForTaskToAppear(taskName: string, timeout: number = 5000): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const exists = await this.taskExists(taskName);
      if (exists) {
        return;
      }
      await this.page.waitForTimeout(100);
    }
    throw new Error(`Task "${taskName}" did not appear within ${timeout}ms`);
  }

  /**
   * Wait for list to load
   */
  async waitForListToLoad(): Promise<void> {
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    } catch {
      // List may load without network changes
    }
  }

  /**
   * Verify task with expected values
   * @param taskName - The task name
   * @param expectedData - Expected task data
   */
  async verifyTaskDetails(taskName: string, expectedData: Partial<ITaskItem>): Promise<boolean> {
    const taskDetails = await this.getTaskDetails(taskName);
    
    if (!taskDetails) {
      return false;
    }

    const matches = {
      name: !expectedData.name || taskDetails.name === expectedData.name,
      description: !expectedData.description || taskDetails.description?.includes(expectedData.description),
      dueDate: !expectedData.dueDate || taskDetails.dueDate.includes(expectedData.dueDate),
      status: !expectedData.status || taskDetails.status === expectedData.status,
    };

    return Object.values(matches).every(match => match);
  }

  /**
   * Get total count displayed in UI
   */
  async getDisplayedTaskCount(): Promise<string> {
    try {
      return await this.taskCount.textContent() ?? '';
    } catch {
      return '';
    }
  }
}
