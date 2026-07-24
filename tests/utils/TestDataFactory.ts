import { DateUtils } from './DateUtils';

/**
 * Test Data Factory
 * Provides factory methods to create test data
 * Follows Builder pattern for flexible test data creation
 */
export class TestDataFactory {
  /**
   * Create default task data for happy path testing
   * @param overrides - Optional overrides for specific fields
   */
  static createTaskData(overrides?: Partial<{
    name: string;
    description: string;
    dueDate: string;
    dueTime: string;
    status: string;
  }>) {
    return {
      name: overrides?.name ?? 'Complete Project Report',
      description: overrides?.description ?? 'Prepare quarterly report for management',
      dueDate: overrides?.dueDate ?? DateUtils.getTomorrowDate(),
      dueTime: overrides?.dueTime ?? '17:00',
      status: overrides?.status ?? 'Pending',
    };
  }

  /**
   * Create task with minimum required details
   */
  static createMinimalTaskData(overrides?: Partial<{
    name: string;
    dueDate: string;
  }>) {
    return {
      name: overrides?.name ?? 'Buy groceries',
      dueDate: overrides?.dueDate ?? DateUtils.getTomorrowDate(),
    };
  }

  /**
   * Create task with future dates
   */
  static createFutureTaskData(overrides?: Partial<{
    name: string;
    description: string;
  }>) {
    return {
      name: overrides?.name ?? 'Future Task',
      description: overrides?.description ?? 'This task is scheduled for the future',
      dueDate: DateUtils.getDateInFuture(45),
      dueTime: '10:00',
      status: 'Pending',
    };
  }

  /**
   * Create task with today's date
   */
  static createTodayTaskData(overrides?: Partial<{
    name: string;
    description: string;
  }>) {
    return {
      name: overrides?.name ?? 'Today Task',
      description: overrides?.description ?? 'Task for today',
      dueDate: DateUtils.getTodayDate(),
      dueTime: '18:00',
      status: 'Pending',
    };
  }

  /**
   * Create task with Sinhala text
   */
  static createSinhalaTaskData(overrides?: Partial<{
    name: string;
    description: string;
  }>) {
    return {
      name: overrides?.name ?? 'ගිණුම් වාර්තාව සම්පූර්ණ කරන්න',
      description: overrides?.description ?? 'ත්‍රෛමාසික වාර්තාව ඉදිරිපත් කිරීම',
      dueDate: DateUtils.getTomorrowDate(),
      dueTime: '17:00',
      status: 'Pending',
    };
  }

  /**
   * Create multiple sequential tasks
   * @param count - Number of tasks to create
   */
  static createMultipleTasks(count: number) {
    const tasks = [];
    for (let i = 1; i <= count; i++) {
      tasks.push({
        name: `Task ${i}`,
        description: `Description for Task ${i}`,
        dueDate: DateUtils.getDateInFuture(i),
        dueTime: `${10 + i}:00`,
        status: 'Pending',
      });
    }
    return tasks;
  }

  /**
   * Create task with long name (close to max)
   */
  static createLongNameTaskData() {
    const longName = 'A'.repeat(250); // Close to 255 character limit
    return this.createTaskData({ name: longName });
  }

  /**
   * Create task with long description
   */
  static createLongDescriptionTaskData() {
    const longDescription = 'Lorem ipsum dolor sit amet. '.repeat(200); // ~5000+ characters
    return this.createTaskData({ description: longDescription });
  }

  /**
   * Create task with emoji characters
   */
  static createEmojiTaskData() {
    return this.createTaskData({
      name: 'Complete 🎯 Project 📝',
      description: 'Finish this task ✅ successfully 🚀',
    });
  }

  /**
   * Create task for boundary testing (1 character name)
   */
  static createMinLengthNameTaskData() {
    return this.createTaskData({ name: 'A' });
  }
}
