# Playwright Test Automation Framework

Comprehensive test automation framework for the Task Tracker application using Playwright with TypeScript.

## Architecture Overview

This framework follows industry best practices and SOLID principles:

### Project Structure

```
tests/
├── e2e/                          # End-to-end test specs
│   └── story-1-add-task.spec.ts
├── pages/                        # Page Object Model
│   ├── BasePage.ts              # Base page with common methods
│   ├── TaskFormPage.ts          # Form component page object
│   ├── TaskListPage.ts          # List component page object
│   └── TaskTrackerPage.ts       # Main application page object
├── fixtures/                     # Playwright test fixtures
│   └── fixtures.ts              # Custom fixtures and setup
├── utils/                        # Utility functions
│   ├── DateUtils.ts             # Date handling utilities
│   └── TestDataFactory.ts       # Test data generation
└── tsconfig.json               # TypeScript configuration
```

## Design Principles Applied

### 1. **Object-Oriented Programming (OOP)**
- **Encapsulation**: Page objects encapsulate UI interactions and element locators
- **Inheritance**: `BasePage` provides common functionality for all page objects
- **Composition**: `TaskTrackerPage` composes `TaskFormPage` and `TaskListPage`

### 2. **SOLID Principles**

#### Single Responsibility Principle (SRP)
- **BasePage**: Handles common page interactions (click, fill, wait)
- **TaskFormPage**: Handles only form-related operations
- **TaskListPage**: Handles only list-related operations
- **TaskTrackerPage**: Orchestrates form and list interactions

#### Open/Closed Principle (OCP)
- `BasePage` is open for extension (subclasses can add features)
- Classes are closed for modification (base functionality doesn't change)

#### Liskov Substitution Principle (LSP)
- All page objects extend `BasePage`
- Can be used interchangeably where `BasePage` is expected

#### Interface Segregation Principle (ISP)
- `ITaskItem` interface defines task structure separately
- Page objects expose only relevant methods
- No bloated interfaces with unused methods

#### Dependency Inversion Principle (DIP)
- Tests depend on abstractions (page objects), not concrete implementations
- `TaskTrackerPage` depends on composed page objects (abstraction)

### 3. **Page Object Model (POM)**
- Each UI component has a dedicated page object
- Locators are centralized and maintainable
- Methods represent user interactions
- Easy to update when UI changes

## Key Features

### Robust Locators
- **Preferred**: `data-testid` attributes (most stable and reliable)
- Approach: Element identification based on test identifiers, not CSS/XPath
- Benefits: 
  - Resilient to CSS/layout changes
  - Clear intent in tests
  - Decoupled from styling

```typescript
readonly taskNameInput = 'input[data-testid="task-name"]';
readonly addButton = 'button[data-testid="add-task-btn"]';
```

### Reusable Base Methods
Common operations in `BasePage`:
- `fillText()` - Fill input with optional clearing
- `click()` - Click elements
- `getText()` - Get element text
- `waitForElement()` - Wait for visibility
- `isVisible()` - Check visibility

### Type Safety
- Full TypeScript support with strict mode
- Interface definitions for domain objects (`ITaskItem`)
- Type-safe test data factory methods

### Test Fixtures
Dependency injection via Playwright fixtures:
```typescript
test('example', async ({ taskTrackerPage, taskFormPage, taskListPage }) => {
  // Pre-initialized page objects
  // Automatic navigation and page load verification
  // Clean separation of concerns
});
```

## Test Cases

### Happy Path Tests (TC-001 to TC-005)

All tests follow the **AAA Pattern**:
1. **Arrange** - Set up test data and initial state
2. **Act** - Perform user actions
3. **Assert** - Verify expected outcomes

#### TC-001: Add task with all valid details
- Full form submission with all fields
- Verify success message
- Verify task appears in list
- Verify task count increases

#### TC-002: Add task with minimum required details
- Form submission without description
- Verify task creation
- Verify task appears in list

#### TC-003: Add multiple tasks sequentially
- Create multiple tasks one after another
- Verify all tasks appear in list
- Verify task count increases correctly

#### TC-004: Add task with future start and due dates
- Set dates 30 and 45 days in future
- Verify task creation
- Verify dates are preserved

#### TC-005: Add task with same start and due date
- Create task where start date equals due date
- Verify task creation
- Verify dates match

## Utility Classes

### DateUtils
Helper methods for date operations:
- `getTodayDate()` - Current date in YYYY-MM-DD
- `getTomorrowDate()` - Tomorrow's date
- `getDateInFuture(days)` - N days in future
- `getDateInPast(days)` - N days in past
- `formatDate(date)` - Format date consistently
- `isValidDate(dateString)` - Validate date format

### TestDataFactory
Factory methods for test data creation:
- `createTaskData()` - Default task data
- `createMinimalTaskData()` - Minimal required fields
- `createFutureTaskData()` - Task with future dates
- `createSameDayTaskData()` - Task with same start/due date
- `createMultipleTasks(count)` - Multiple sequential tasks
- `createSinhalaTaskData()` - Task with Sinhala text
- `createEmojiTaskData()` - Task with emoji characters
- `createLongNameTaskData()` - Task with max-length name

All factory methods support overrides for flexible test data:
```typescript
TestDataFactory.createTaskData({
  name: 'Custom Task',
  startDate: DateUtils.getTodayDate()
});
```

## Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
npm install --save-dev @playwright/test
npm install --save-dev typescript ts-node
npm install --save-dev @types/node
```

### Configuration Files

#### playwright.config.ts
- Base URL: `http://localhost:3000`
- Browsers: Chromium, Firefox, WebKit
- Mobile testing support
- Screenshot/video on failure
- HTML report generation
- Runs local dev server before tests

#### tsconfig.json
- Target: ES2020
- Strict mode enabled
- Playwright types included
- Source maps enabled

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/e2e/story-1-add-task.spec.ts
```

### Run specific test
```bash
npx playwright test -g "TC-001"
```

### Run in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run with debug mode
```bash
npx playwright test --debug
```

### Generate HTML report
```bash
npx playwright test
npx playwright show-report
```

## Best Practices Implemented

### 1. **Locator Strategy**
✅ Use `data-testid` attributes (most reliable)
✅ Use accessible identifiers (role, text)
✅ Avoid brittle CSS selectors
✅ Avoid XPath when possible

### 2. **Wait Strategies**
✅ Use implicit waits (element.waitFor)
✅ Avoid hardcoded `page.waitForTimeout()`
✅ Wait for meaningful state changes
✅ Reasonable timeout defaults (5000ms)

### 3. **Test Isolation**
✅ Each test is independent
✅ No shared state between tests
✅ Setup/teardown with beforeEach/afterEach
✅ Page navigation before each test

### 4. **Assertions**
✅ Use Playwright's expect() matchers
✅ Clear assertion messages
✅ Verify multiple aspects of success
✅ Check both positive and negative cases

### 5. **Page Objects**
✅ One page object per component
✅ Encapsulate all locators
✅ Methods represent user actions
✅ Clear, descriptive method names
✅ Proper documentation with JSDoc

### 6. **Type Safety**
✅ Strict TypeScript configuration
✅ Interface definitions for domain objects
✅ Type-safe factory methods
✅ No `any` types without justification

### 7. **Code Organization**
✅ Clear separation of concerns
✅ Utilities for reusable functionality
✅ Factory pattern for test data
✅ Fixture-based setup
✅ Comprehensive documentation

## Extending the Framework

### Adding a New Test
```typescript
test('TC-XXX: Description', async ({ taskTrackerPage }) => {
  // Arrange
  const testData = TestDataFactory.createTaskData();
  
  // Act
  await taskTrackerPage.formPage.fillAndSubmitForm(testData);
  
  // Assert
  expect(await taskTrackerPage.listPage.taskExists(testData.name)).toBeTruthy();
});
```

### Creating a New Page Object
```typescript
export class NewPage extends BasePage {
  readonly element1 = '[data-testid="element-1"]';
  readonly element2 = '[data-testid="element-2"]';

  async performAction(): Promise<void> {
    await this.click(this.element1);
  }
}
```

### Adding Custom Fixture
```typescript
export const test = base.extend<TestFixtures>({
  myCustomPage: async ({ page }, use) => {
    const customPage = new CustomPage(page);
    await customPage.setup();
    await use(customPage);
    await customPage.cleanup();
  },
});
```

## Test Reporting

Reports are generated in multiple formats:
- **HTML Report**: `playwright-report/index.html`
- **JUnit XML**: `test-results/junit.xml`
- **JSON**: `test-results/test-results.json`

### View HTML Report
```bash
npx playwright show-report
```

## CI/CD Integration

Configuration supports CI/CD with:
- Automatic retry on CI
- Single worker mode on CI
- Artifact collection
- Video/screenshot artifacts on failure
- JUnit XML for integration

## Troubleshooting

### Tests timing out
- Increase timeout in test: `test.setTimeout(60000)`
- Check application startup
- Verify baseURL in playwright.config.ts

### Locators not found
- Use `npx playwright test --debug` to inspect
- Check `data-testid` attributes in application
- Verify page is loaded before interaction

### Flaky tests
- Add appropriate waits using `waitFor()`
- Verify element is visible before click
- Use `waitForLoadState('networkidle')`

## Contributing Guidelines

When adding new tests:
1. Follow AAA pattern (Arrange, Act, Assert)
2. Use page objects for all interactions
3. Add clear test descriptions
4. Use TestDataFactory for test data
5. Update documentation
6. Ensure tests are isolated and repeatable
7. Add proper JSDoc comments

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)

## License

This test framework is part of the Task Tracker QA training project.
