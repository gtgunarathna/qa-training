# Test Cases: Story 1 - Add a New Task

**User Story:** As a user, I want to add a new task so that I can track the things I need to do.

---

## Positive Flows (Happy Path)

| TC # | Scenario Name | Preconditions | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-001 | Add task with all valid details | User is on the task list page; Form is empty and ready for input | 1. Enter task name "Complete Project Report"<br>2. Enter task description "Prepare quarterly report for management"<br>3. Enter start date as today's date<br>4. Enter due date as tomorrow's date<br>5. Click "Add" button | Task is created and displayed in the task list with all entered details; Task status shows as "Not Started"; Task appears at the end or beginning of the list | High |
| TC-002 | Add task with minimum required details | User is on the task list page; Form is empty | 1. Enter task name "Buy groceries"<br>2. Leave description empty<br>3. Set start date and due date<br>4. Click "Add" button | Task is created and saved; Description field shows as empty or "N/A" | High |
| TC-003 | Add multiple tasks sequentially | User is on the task list page with one existing task | 1. Enter task name "Task 2"<br>2. Enter description<br>3. Set dates<br>4. Click "Add"<br>5. Repeat with "Task 3" details | Both tasks are added to the list; Total task count increases | High |
| TC-004 | Add task with future start and due dates | User is on the task list page | 1. Enter task name "Future Task"<br>2. Enter description<br>3. Set start date to 30 days in future<br>4. Set due date to 45 days in future<br>5. Click "Add" | Task is created with future dates; Task displays correctly in list | Medium |
| TC-005 | Add task with same start and due date | User is on the task list page | 1. Enter task name "Same Day Task"<br>2. Enter description<br>3. Set start date and due date to same day<br>4. Click "Add" | Task is created successfully; Both dates display as the same | Medium |

---

## Negative Flows (Invalid Inputs)

| TC # | Scenario Name | Preconditions | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-006 | Add task with empty task name | User is on the task list page | 1. Leave task name empty<br>2. Enter description "Test description"<br>3. Set start and due dates<br>4. Click "Add" button | Form validation error appears; Task is not created; Error message: "Task name is required" | High |
| TC-007 | Add task with empty start date | User is on the task list page | 1. Enter task name "No Start Date"<br>2. Enter description<br>3. Leave start date empty<br>4. Set due date<br>5. Click "Add" | Form validation error appears; Task is not created; Error message: "Start date is required" | High |
| TC-008 | Add task with empty due date | User is on the task list page | 1. Enter task name "No Due Date"<br>2. Enter description<br>3. Set start date<br>4. Leave due date empty<br>5. Click "Add" | Form validation error appears; Task is not created; Error message: "Due date is required" | High |
| TC-009 | Add task with due date before start date | User is on the task list page | 1. Enter task name "Invalid Dates"<br>2. Enter description<br>3. Set start date to tomorrow<br>4. Set due date to today<br>5. Click "Add" | Form validation error appears; Task is not created; Error message: "Due date must be after or equal to start date" | High |
| TC-010 | Add task with special characters in name | User is on the task list page | 1. Enter task name "@#$%^&*()"<br>2. Enter description<br>3. Set dates<br>4. Click "Add" | Validation error or special characters are escaped; Task may not be created OR saved with sanitized characters | Medium |
| TC-011 | Add task with only spaces in name | User is on the task list page | 1. Enter task name with only spaces "     "<br>2. Enter description<br>3. Set dates<br>4. Click "Add" | Form validation error; Task is not created; Error message: "Task name cannot be empty" | High |
| TC-012 | Add task with invalid date format | User is on the task list page | 1. Enter task name "Bad Date Format"<br>2. Enter description<br>3. Enter start date as "13-45-2026" or invalid format<br>4. Set due date<br>5. Click "Add" | Date input is rejected or reformatted; Error message appears; Task is not created | High |

---

## Boundary Conditions (Min/Max)

| TC # | Scenario Name | Preconditions | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-013 | Add task with minimum length task name (1 character) | User is on the task list page | 1. Enter task name "A"<br>2. Enter description "Test"<br>3. Set start and due dates<br>4. Click "Add" | Task is created with single character name | Medium |
| TC-014 | Add task with maximum length task name (255 characters) | User is on the task list page | 1. Enter task name with 255 characters<br>2. Enter description<br>3. Set dates<br>4. Click "Add" | Task is created and displayed correctly with full name | Medium |
| TC-015 | Add task with task name exceeding maximum length (256+ characters) | User is on the task list page | 1. Enter task name with 256+ characters<br>2. Enter description<br>3. Set dates<br>4. Click "Add" | Task name is truncated to 255 characters OR validation error appears; Task is created with truncated name | Medium |
| TC-016 | Add task with very long description (5000+ characters) | User is on the task list page | 1. Enter task name "Long Description"<br>2. Enter very long description (5000+ characters)<br>3. Set dates<br>4. Click "Add" | Task is created; Description is stored and can be viewed (may be truncated in list view) | Low |
| TC-017 | Add task with today's date as both start and due date | User is on the task list page | 1. Enter task name "Today Task"<br>2. Enter description<br>3. Set both start and due date to today<br>4. Click "Add" | Task is created with today's date for both fields | Medium |
| TC-018 | Add task with date exactly 1 year in future | User is on the task list page | 1. Enter task name "One Year Task"<br>2. Enter description<br>3. Set start date to today, due date to exactly 1 year from today<br>4. Click "Add" | Task is created successfully with dates set correctly | Low |

---

## Edge Cases

| TC # | Scenario Name | Preconditions | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-019 | Add task and refresh page immediately | User has filled form and is about to add task | 1. Enter all task details<br>2. Click "Add"<br>3. Refresh browser immediately (F5) | Task is created and persisted; Task appears in list after page refresh | High |
| TC-020 | Add task with form autofill suggestion | User is on the task list page; Browser has previous task suggestions | 1. Start typing task name that matches previous entry<br>2. Accept autofill suggestion<br>3. Complete other fields<br>4. Click "Add" | Task is created with autofilled data; No duplicate prevention for identical task names | Medium |
| TC-021 | Add task while network connection is slow | User is on the task list page with simulated slow network | 1. Enter all task details<br>2. Click "Add"<br>3. Network experiences 5+ second delay<br>4. Wait for response | Task is created after delay; Loading indicator displays during submission; Task appears in list | Medium |
| TC-022 | Add task when task list is empty | User is on the task list page with zero existing tasks | 1. Enter task details<br>2. Click "Add" | Task is created and displayed; Empty state message disappears; Task count shows as 1 | High |
| TC-023 | Add task when task list has 1000+ tasks | User is on the task list page with maximum tasks loaded | 1. Enter task details<br>2. Click "Add"<br>3. Observe list rendering | New task is added; Page remains responsive; Task appears in list (top or bottom based on sorting); No performance degradation | Low |
| TC-024 | Add task with copy-pasted content containing hidden formatting | User is on the task list page | 1. Copy task name from rich text editor with formatting<br>2. Paste into task name field<br>3. Paste task description with HTML/formatting<br>4. Set dates<br>5. Click "Add" | Task is created; Formatting is stripped or escaped; Content displays as plain text | Medium |
| TC-025 | Add task with emoji characters | User is on the task list page | 1. Enter task name "Complete 🎯 Project 📝"<br>2. Enter description with emoji<br>3. Set dates<br>4. Click "Add" | Task is created and saved; Emoji displays correctly in task name and description | Low |
| TC-026 | Add task with multiple consecutive spaces | User is on the task list page | 1. Enter task name with multiple spaces: "Task     Name"<br>2. Enter description<br>3. Set dates<br>4. Click "Add" | Task is created; Multiple spaces are preserved OR normalized to single spaces | Low |
| TC-027 | Add task when form has validation errors on multiple fields | User is on the task list page | 1. Leave task name empty<br>2. Leave start date empty<br>3. Set due date before today<br>4. Click "Add" | All validation errors are displayed at once; Task is not created; User can see all issues simultaneously | High |
| TC-028 | Add task and check real-time sync if multiple devices | User is on task list page on two different devices/browsers simultaneously | 1. Device A: Enter task details and click "Add"<br>2. Observe Device B immediately after submission | Task appears on Device B in real-time or after page refresh; Data consistency is maintained | Low |
| TC-029 | Add task with Sinhala language text | User is on the task list page | 1. Enter task name in Sinhala "ගිණුම් වාර්තාව සම්පූර්ණ කරන්න"<br>2. Enter task description in Sinhala "ත්‍රෛමාසික වාර්තාව ඉදිරිපත් කිරීම"<br>3. Set start date and due date<br>4. Click "Add" | Task is created and saved with Sinhala text; Sinhala characters display correctly in task name and description; No encoding or character corruption occurs | Medium |

---

## Test Case Summary

- **Positive Flows:** TC-001 to TC-005 (5 test cases)
- **Negative Flows:** TC-006 to TC-012 (7 test cases)
- **Boundary Conditions:** TC-013 to TC-018 (6 test cases)
- **Edge Cases:** TC-019 to TC-029 (11 test cases)
- **Total Test Scenarios:** 29

**Priority Distribution:**
- **High Priority:** 14 scenarios (Core functionality and critical validations)
- **Medium Priority:** 11 scenarios (Important behaviors and user interactions)
- **Low Priority:** 4 scenarios (Performance, extreme conditions, and enhancements)

---

## Notes for Automation

- [ ] Automate Positive flows - happy path scenarios
- [ ] Automate Negative flows - form validation scenarios
- [ ] Automate Boundary conditions - min/max tests
- [ ] Consider automating high-priority edge cases
- [ ] Use Page Object Model with separate page objects for:
  - TaskFormPage (form interactions)
  - TaskListPage (list verification)
  - Common utilities (date handling, assertions)
