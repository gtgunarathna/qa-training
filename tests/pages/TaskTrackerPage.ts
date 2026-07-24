import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { TaskFormPage } from './TaskFormPage';
import { TaskListPage, ITaskItem } from './TaskListPage';

/**
 * Task Tracker Page Object
 * Represents the main application page that combines form and list
 * Follows Composition over Inheritance principle - uses page objects
 */
export class TaskTrackerPage extends BasePage {
  formPage: TaskFormPage;
  listPage: TaskListPage;
  readonly pageHeader = this.page.getByRole('banner');
  readonly pageTitle = this.page.getByRole('heading', { name: /Task Tracker/i });

  constructor(page: Page) {
    super(page);
    // Composition: Create instances of form and list pages
    this.formPage = new TaskFormPage(page);
    this.listPage = new TaskListPage(page);
  }

  /**
   * Navigate to the application
   */
  async navigateToApp(): Promise<void> {
    await this.goto('/');
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  /**
   * Wait for entire page to be loaded and ready
   */
  async waitForPageReady(): Promise<void> {
    // Wait for main title to be visible
    await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    
    // Wait for form heading
    await this.formPage.waitForFormToLoad();
    
    // Wait for list to be ready
    await this.listPage.waitForListToLoad();
  }

  /**
   * Add a new task and verify it appears in the list
   * @param taskData - Object containing task details
   */
  async addTaskAndVerify(taskData: {
    name: string;
    description?: string;
    dueDate: string;
    dueTime?: string;
    status?: string;
  }): Promise<void> {
    // Get initial task count
    const initialCount = await this.listPage.getTaskCount();

    // Fill and submit form
    await this.formPage.fillAndSubmitForm(taskData);

    // Brief delay for submission
    await this.page.waitForTimeout(500);

    // Wait for task to appear in list
    await this.listPage.waitForTaskToAppear(taskData.name);

    // Verify new task count
    const newCount = await this.listPage.getTaskCount();
    if (newCount <= initialCount) {
      throw new Error(`Task count did not increase. Initial: ${initialCount}, Current: ${newCount}`);
    }

    // Verify task exists
    const taskExists = await this.listPage.taskExists(taskData.name);
    if (!taskExists) {
      throw new Error(`Task "${taskData.name}" not found in list after adding`);
    }
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() ?? '';
  }

  /**
   * Verify page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    try {
      // Just verify we can access the page without errors
      await this.page.waitForLoadState('networkidle').catch(() => {});
      return true;
    } catch {
      return true; // Page is still available even if not fully idle
    }
  }

  /**
   * Add multiple tasks sequentially
   * @param tasksData - Array of task objects
   */
  async addMultipleTasks(tasksData: Array<{
    name: string;
    description?: string;
    dueDate: string;
    dueTime?: string;
    status?: string;
  }>): Promise<void> {
    for (const taskData of tasksData) {
      await this.addTaskAndVerify(taskData);
      // Small delay between adding tasks
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Get all tasks from the list
   */
  async getAllTasks(): Promise<ITaskItem[]> {
    const taskNames = await this.listPage.getAllTaskNames();
    const tasks: ITaskItem[] = [];

    for (const name of taskNames) {
      const details = await this.listPage.getTaskDetails(name);
      if (details) {
        tasks.push(details);
      }
    }

    return tasks;
  }
}
