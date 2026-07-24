import { test, expect } from '../fixtures/fixtures';
import { TestDataFactory } from '../utils/TestDataFactory';
import { DateUtils } from '../utils/DateUtils';

/**
 * Happy Path Tests - Story 1: Add a New Task
 * 
 * Tests represent positive flows where users successfully add tasks
 * Each test is isolated and follows the AAA pattern: Arrange, Act, Assert
 */

test.describe('Story 1: Add a New Task - Happy Path Scenarios', () => {
  test.beforeEach(async ({ taskTrackerPage }) => {
    // Verify page is loaded before each test
    expect(await taskTrackerPage.isPageLoaded()).toBeTruthy();
  });

  /**
   * TC-001: Add task with all valid details
   * User should be able to add a task with all information filled
   */
  test('TC-001: Add task with all valid details', async ({ taskTrackerPage }) => {
    // Arrange
    const taskData = TestDataFactory.createTaskData();
    const initialTaskCount = await taskTrackerPage.listPage.getTaskCount();

    // Act
    await taskTrackerPage.formPage.fillAndSubmitForm(taskData);

    // Assert
    // Wait for task to appear in list
    await taskTrackerPage.listPage.waitForTaskToAppear(taskData.name);

    // Verify task count increased
    const newTaskCount = await taskTrackerPage.listPage.getTaskCount();
    expect(newTaskCount).toBe(initialTaskCount + 1);

    // Verify task exists in list
    const taskExists = await taskTrackerPage.listPage.taskExists(taskData.name);
    expect(taskExists).toBeTruthy();
  });

  /**
   * TC-002: Add task with minimum required details
   * User should be able to add a task with only name and due date (no description)
   */
  test('TC-002: Add task with minimum required details', async ({ taskTrackerPage }) => {
    // Arrange
    const taskData = TestDataFactory.createMinimalTaskData();
    const initialTaskCount = await taskTrackerPage.listPage.getTaskCount();

    // Act
    // Fill form without optional fields
    await taskTrackerPage.formPage.enterTaskName(taskData.name);
    await taskTrackerPage.formPage.setDueDate(taskData.dueDate);
    await taskTrackerPage.formPage.clickAddButton();

    // Assert
    // Verify task appears in list
    await taskTrackerPage.listPage.waitForTaskToAppear(taskData.name);

    // Verify task count increased
    const newTaskCount = await taskTrackerPage.listPage.getTaskCount();
    expect(newTaskCount).toBe(initialTaskCount + 1);

    // Verify task exists
    const taskExists = await taskTrackerPage.listPage.taskExists(taskData.name);
    expect(taskExists).toBeTruthy();
  });

  /**
   * TC-003: Add multiple tasks sequentially
   * User should be able to add multiple tasks one after another
   */
  test('TC-003: Add multiple tasks sequentially', async ({ taskTrackerPage }) => {
    // Arrange
    const tasksData = TestDataFactory.createMultipleTasks(2); // Create Task 1 and Task 2
    const initialTaskCount = await taskTrackerPage.listPage.getTaskCount();

    // Act - Add first task
    await taskTrackerPage.formPage.fillAndSubmitForm(tasksData[0]);
    await taskTrackerPage.page.waitForTimeout(300);

    // Act - Add second task
    await taskTrackerPage.formPage.fillAndSubmitForm(tasksData[1]);

    // Assert
    // Wait for both tasks to appear
    await taskTrackerPage.listPage.waitForTaskToAppear(tasksData[0].name);
    await taskTrackerPage.listPage.waitForTaskToAppear(tasksData[1].name);

    // Verify task count increased by 2
    const finalTaskCount = await taskTrackerPage.listPage.getTaskCount();
    expect(finalTaskCount).toBe(initialTaskCount + 2);

    // Verify both tasks exist
    const task1Exists = await taskTrackerPage.listPage.taskExists(tasksData[0].name);
    const task2Exists = await taskTrackerPage.listPage.taskExists(tasksData[1].name);
    expect(task1Exists).toBeTruthy();
    expect(task2Exists).toBeTruthy();

    // Verify all task names
    const allTaskNames = await taskTrackerPage.listPage.getAllTaskNames();
    expect(allTaskNames.some(name => name.includes(tasksData[0].name))).toBeTruthy();
    expect(allTaskNames.some(name => name.includes(tasksData[1].name))).toBeTruthy();
  });

  /**
   * TC-004: Add task with future due date
   * User should be able to add a task with due date far in the future
   */
  test('TC-004: Add task with future due date', async ({ taskTrackerPage }) => {
    // Arrange
    const taskData = TestDataFactory.createFutureTaskData();
    expect(DateUtils.isValidDate(taskData.dueDate)).toBeTruthy();

    const initialTaskCount = await taskTrackerPage.listPage.getTaskCount();

    // Act
    await taskTrackerPage.formPage.fillAndSubmitForm(taskData);

    // Assert
    // Wait for task to appear
    await taskTrackerPage.listPage.waitForTaskToAppear(taskData.name);

    // Verify task count increased
    const newTaskCount = await taskTrackerPage.listPage.getTaskCount();
    expect(newTaskCount).toBe(initialTaskCount + 1);

    // Verify task exists
    const taskExists = await taskTrackerPage.listPage.taskExists(taskData.name);
    expect(taskExists).toBeTruthy();
  });

  /**
   * TC-005: Add task with today's due date
   * User should be able to add a task due today
   */
  test('TC-005: Add task with today due date', async ({ taskTrackerPage }) => {
    // Arrange
    const taskData = TestDataFactory.createTodayTaskData();
    const todayDate = DateUtils.getTodayDate();
    expect(taskData.dueDate).toBe(todayDate);

    const initialTaskCount = await taskTrackerPage.listPage.getTaskCount();

    // Act
    await taskTrackerPage.formPage.fillAndSubmitForm(taskData);

    // Assert
    // Wait for task to appear
    await taskTrackerPage.listPage.waitForTaskToAppear(taskData.name);

    // Verify task count increased
    const newTaskCount = await taskTrackerPage.listPage.getTaskCount();
    expect(newTaskCount).toBe(initialTaskCount + 1);

    // Verify task exists
    const taskExists = await taskTrackerPage.listPage.taskExists(taskData.name);
    expect(taskExists).toBeTruthy();
  });
});
