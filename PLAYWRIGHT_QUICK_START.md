# Quick Start Guide - Running Playwright Tests

## Prerequisites

Before running tests, ensure:
1. Application is running on `http://localhost:3000`
2. Node.js 16+ is installed
3. Dependencies are installed

## Installation

```bash
# Install Playwright and dependencies
npm install --save-dev @playwright/test
npm install --save-dev typescript ts-node @types/node

# Install project dependencies
npm install
```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Happy Path Tests Only
```bash
npx playwright test tests/e2e/story-1-add-task.spec.ts
```

### Run Specific Test Case
```bash
# Run TC-001
npx playwright test -g "TC-001"

# Run all tests with "Add task" in name
npx playwright test -g "Add task"
```

### Run in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run in Debug Mode
```bash
npx playwright test --debug
```

### Run Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run with Verbose Output
```bash
npx playwright test --reporter=list
```

## Viewing Reports

### HTML Report
```bash
npx playwright test
npx playwright show-report
```

The report opens automatically in your default browser showing:
- Test results and status
- Screenshots on failure
- Video recordings on failure
- Execution time
- Detailed error messages

### JUnit XML Report
Located at: `test-results/junit.xml`
- Integrate with CI/CD systems
- Import into test management tools

## Debugging Failed Tests

### 1. Use Playwright Inspector
```bash
npx playwright test --debug
```
- Step through test execution
- Inspect DOM elements
- Check locators

### 2. Check Screenshots
Located at: `test-results/`
- Visual inspection of failure
- Check element state at time of failure

### 3. Watch Videos
Located at: `test-results/`
- Video recording of test execution
- See exact actions leading to failure

### 4. Use Trace Viewer
```bash
npx playwright show-trace test-results/trace.zip
```

## Test Structure

All tests use this pattern:

```typescript
test('TC-XXX: Description', async ({ taskTrackerPage }) => {
  // 1. ARRANGE - Set up test data
  const taskData = TestDataFactory.createTaskData();
  
  // 2. ACT - Perform user actions
  await taskTrackerPage.formPage.fillAndSubmitForm(taskData);
  
  // 3. ASSERT - Verify expected results
  expect(await taskTrackerPage.listPage.taskExists(taskData.name)).toBeTruthy();
});
```

## Using Test Data Factory

Create test data easily:

```typescript
// Default task data
TestDataFactory.createTaskData()

// Minimal details (no description)
TestDataFactory.createMinimalTaskData()

// Future dates (30 and 45 days ahead)
TestDataFactory.createFutureTaskData()

// Same start and due date
TestDataFactory.createSameDayTaskData()

// Multiple tasks
TestDataFactory.createMultipleTasks(3)

// Special cases
TestDataFactory.createSinhalaTaskData()
TestDataFactory.createEmojiTaskData()
TestDataFactory.createLongNameTaskData()
```

## Using Page Objects

Page objects provide safe, maintainable interactions:

```typescript
// Task Form operations
await taskTrackerPage.formPage.enterTaskName('Task Name');
await taskTrackerPage.formPage.enterTaskDescription('Description');
await taskTrackerPage.formPage.setStartDate('2024-12-31');
await taskTrackerPage.formPage.setDueDate('2025-01-31');
await taskTrackerPage.formPage.clickAddButton();

// Task List operations
const taskCount = await taskTrackerPage.listPage.getTaskCount();
const taskExists = await taskTrackerPage.listPage.taskExists('Task Name');
const taskDetails = await taskTrackerPage.listPage.getTaskDetails('Task Name');

// Main application operations
await taskTrackerPage.addTaskAndVerify(taskData);
await taskTrackerPage.addMultipleTasks([task1, task2, task3]);
```

## Using Date Utilities

Handle dates consistently:

```typescript
import { DateUtils } from '../utils/DateUtils';

DateUtils.getTodayDate()           // Today: 2024-12-24
DateUtils.getTomorrowDate()        // Tomorrow: 2024-12-25
DateUtils.getDateInFuture(30)      // 30 days: 2025-01-23
DateUtils.getDateInPast(7)         // 7 days ago: 2024-12-17
DateUtils.getOneYearInFutureDate() // Next year
DateUtils.isValidDate('2024-12-24') // true/false
```

## Common Issues & Solutions

### Tests Fail - Application Not Running
```bash
# Ensure dev server is running
npm run dev

# Or let Playwright start it
# (configured in playwright.config.ts)
```

### Elements Not Found
```bash
# Check data-testid attributes exist in application
# Use debug mode to inspect
npx playwright test --debug

# Increase timeout if needed
test.setTimeout(60000);
```

### Flaky Tests
- Add proper wait conditions
- Use `waitForElement()` for visibility
- Avoid hardcoded `waitForTimeout()`

### Screenshot/Video Not Generated
- Ensure tests are in `tests/e2e/` directory
- Rename spec files with `.spec.ts` extension
- Check test results directory permissions

## File Structure Expected

```
project-root/
├── tests/
│   ├── e2e/
│   │   └── *.spec.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── TaskFormPage.ts
│   │   ├── TaskListPage.ts
│   │   └── TaskTrackerPage.ts
│   ├── fixtures/
│   │   └── fixtures.ts
│   ├── utils/
│   │   ├── DateUtils.ts
│   │   └── TestDataFactory.ts
│   └── tsconfig.json
├── playwright.config.ts
└── package.json
```

## Continuous Integration

### GitHub Actions Example
```yaml
name: Run Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run dev &
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Next Steps

1. ✅ Review test cases in `tests/e2e/story-1-add-task.spec.ts`
2. ✅ Examine page objects in `tests/pages/`
3. ✅ Run tests: `npx playwright test`
4. ✅ View report: `npx playwright show-report`
5. ✅ Create new tests following the same pattern
6. ✅ Extend page objects for new features

## Support

- Check `TEST_FRAMEWORK_README.md` for detailed documentation
- Review Playwright docs: https://playwright.dev
- Inspect page with Playwright Inspector: `--debug` flag
- Check application logs for errors

Happy Testing! 🎭
