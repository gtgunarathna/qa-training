# Test Case Discovery Prompts

This file contains only prompts for test case discovery and test design.

## 1. Core Discovery Prompt

Generate comprehensive test cases for the Task Tracker application from user stories and acceptance criteria. Cover positive flows, negative flows, boundary conditions, and edge cases. Output clear preconditions, steps, expected results, and priority for each test case.

## 2. Story-Based Discovery Prompts

### Story 1 - Add a New Task

As a user, I want to add a new task so that I can track the things I need to do.

### Story 2 - Edit an Existing Task

As a user, I want to edit an existing task, so that I can keep task information up to date.

### Story 3 - Mark a Task as Completed

As a user, I want to mark a task as completed so that I can track progress.

### Story 4 - Delete Unwanted Tasks

As a user, I want to delete unwanted tasks, so I will only have relevant tasks on my task list.

### Story 5 - Prioritize Tasks

As a user, I want to prioritize my tasks so that I can easily identify the order of priority of my tasks.

## 3. Acceptance-Criteria Discovery Prompts

### Story 1

- Given I am on the task list page
- When I enter task name, task description, start date, due date, and click Add
- Then the new task details should be saved and listed in the task list as a new task

### Story 2

- Given I have an existing task in my task list
- When I edit the task details and save the changes
- Then the task should be updated with the new information and the updated task should be displayed in the task list

### Story 3

- Given I have completed a task in my task list
- When I mark the task as Completed
- Then the task status should be updated and the updated task should be displayed in the task list

### Story 4

- Given I have an unwanted task on my task list
- When I select and mark it as delete
- Then the selected task should be deleted and that task should be removed from the task list

### Story 5

- Given I have a task I need to prioritize
- When I select and Set Priority
- Then the selected task should be marked with the priority the user gave and the task priority should be clearly visible on the task list

## 4. Prompt Templates for Test Case Discovery

### Template A - End-to-End Test Case Discovery

Generate end-to-end test cases for Story <N> using its acceptance criteria. Include happy path, validations, error handling, data boundaries, and UX edge cases. Use a table with columns: Test Case ID, Scenario, Preconditions, Steps, Expected Result, Priority.

### Template B - Negative Test Discovery

Generate only negative test cases for Story <N>. Focus on invalid inputs, missing required fields, invalid state transitions, malformed dates, and user behavior anomalies.

### Template C - Boundary Test Discovery

Generate boundary-focused test cases for Story <N>. Cover min and max lengths, date limits, empty states, duplicate values, and large dataset behavior.

### Template D - Risk-Based Discovery

Generate high-risk test cases first for Story <N>, ranked by business impact and probability. Include why each case is high risk and mark as P1, P2, or P3.

## 5. Story 1 Coverage Reference

- Positive flows: TC-001 to TC-005
- Negative flows: TC-006 to TC-012
- Boundary conditions: TC-013 to TC-018
- Edge cases: TC-019 to TC-029
