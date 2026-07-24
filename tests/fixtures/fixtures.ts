import { test as base, Page } from '@playwright/test';
import { TaskTrackerPage } from '../pages/TaskTrackerPage';
import { TaskFormPage } from '../pages/TaskFormPage';
import { TaskListPage } from '../pages/TaskListPage';

/**
 * Extended Playwright Test Fixtures
 * Provides page objects to all tests
 * Follows Dependency Injection pattern
 */
export type TestFixtures = {
  taskTrackerPage: TaskTrackerPage;
  taskFormPage: TaskFormPage;
  taskListPage: TaskListPage;
};

/**
 * Create extended test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  /**
   * Fixture: Task Tracker Page Object
   * Provides main application page with composed form and list pages
   */
  taskTrackerPage: async ({ page }, use) => {
    const taskTrackerPage = new TaskTrackerPage(page);
    await taskTrackerPage.navigateToApp();
    await taskTrackerPage.waitForPageReady();
    await use(taskTrackerPage);
  },

  /**
   * Fixture: Task Form Page Object
   * Provides form-specific interactions
   */
  taskFormPage: async ({ page }, use) => {
    const taskFormPage = new TaskFormPage(page);
    await taskFormPage.goto('/');
    await taskFormPage.waitForFormToLoad();
    await use(taskFormPage);
  },

  /**
   * Fixture: Task List Page Object
   * Provides list-specific interactions
   */
  taskListPage: async ({ page }, use) => {
    const taskListPage = new TaskListPage(page);
    await taskListPage.goto('/');
    await taskListPage.waitForListToLoad();
    await use(taskListPage);
  },
});

// Export expect for use in tests
export { expect } from '@playwright/test';
