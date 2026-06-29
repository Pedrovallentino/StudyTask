# StudyTask - Functional Schema

**Date**: 2026-06-29  
**Status**: Active  
**Based on**: [specs/001-task-management-core/spec.md](specs/001-task-management-core/spec.md)  
**Constitution**: [.specify/memory/constitution.md](.specify/memory/constitution.md)

---

## 1. System Overview

**StudyTask** is a web-based academic task management application designed for students to organize, track, and manage their assignments, projects, tests, and coursework across multiple disciplines.

### Core Value Proposition

Students need a single, centralized location to track all their academic tasks without external dependencies, accounts, or backend services. StudyTask provides this via a pure HTML5/CSS3/JavaScript web application with offline-capable localStorage persistence.

### Key Characteristics

- **Scope**: Single-user, browser-based task management
- **Persistence**: localStorage (offline-capable)
- **Architecture**: Pure frontend (no backend, no external libraries)
- **Deployment**: Static site on GitHub Pages
- **Accessibility**: WCAG 2.1 Level AA compliant
- **Responsive**: Mobile to desktop support
- **Data Privacy**: User owns all data; no cloud sync or external storage

---

## 2. Functional Requirements (RF01–RF08)

### RF-001: Create New Academic Task
**Description**: System MUST allow users to create a new academic task with title, discipline, due date, and priority.

**Input**: User form submission with task details  
**Output**: New task created and added to task list  
**Constraint**: Title, discipline, due date are mandatory (see RN-001)  
**Entity Impact**: Creates new Task record in localStorage

---

### RF-002: Mandatory Field Validation
**Description**: System MUST require title, discipline, and due date as mandatory fields; priority defaults to "Medium" if not specified.

**Input**: User submission attempt  
**Output**: Validation feedback if fields missing; task created with default priority  
**Validation Rules**:
- Title: Not empty, trimmed (see RN-007)
- Discipline: Not empty, trimmed (see RN-007)
- Due Date: Valid date format, can be past/future
- Priority: Defaults to "Medium" (see RN-002)

**Entity Impact**: Ensures Task.title, Task.discipline, Task.dueDate are always populated

---

### RF-003: List All Tasks
**Description**: System MUST display all created tasks in a list view showing all relevant details.

**Input**: Application load or task CRUD operation completion  
**Output**: Rendered list of Task objects with visible fields (title, discipline, dueDate, priority, status)  
**Display**: Chronological or category-based ordering  
**Entity Impact**: Queries all Task records from localStorage

---

### RF-004: Mark Task as Complete/Pending
**Description**: System MUST allow users to mark a task as completed or return it to pending status via a toggle/checkbox.

**Input**: User clicks status toggle/checkbox  
**Output**: Task.status changes from "Pending" to "Completed" or vice versa  
**Persistence**: Status change saved to localStorage immediately  
**Entity Impact**: Updates Task.status and Task.updatedAt

---

### RF-005: Edit Existing Task
**Description**: System MUST allow users to edit any field of an existing task (title, discipline, date, priority, status).

**Input**: User opens edit form and modifies fields  
**Output**: Updated task with new values persisted  
**Constraint**: All mandatory fields must remain valid after edit (see RN-001)  
**Entity Impact**: Updates Task fields (title, discipline, dueDate, priority, status) and Task.updatedAt

---

### RF-006: Delete Task with Confirmation
**Description**: System MUST allow users to delete a task only after explicit user confirmation via a modal dialog.

**Input**: User clicks Delete button  
**Process**:
  1. Modal confirmation dialog displays asking "Are you sure you want to delete this task?"
  2. User clicks "Confirm" or "Cancel"
  3. If Confirm: Task removed from localStorage
  4. If Cancel: Task remains unchanged

**Output**: Task deleted from list or deletion cancelled  
**Entity Impact**: Removes Task record from localStorage (permanent)

---

### RF-007: Filter Tasks by Status
**Description**: System MUST provide filter options to display tasks by status: All, Pending, Completed.

**Input**: User selects filter option  
**Output**: Task list filtered to show matching tasks or all tasks  
**Filters**:
- **All**: Display all tasks regardless of status
- **Pending**: Display only tasks where Task.status = "Pending"
- **Completed**: Display only tasks where Task.status = "Completed"

**Entity Impact**: No data change; display-layer filtering based on Task.status

---

### RF-008: Persist Data in localStorage
**Description**: System MUST persist all task data in localStorage so tasks remain available after browser close and reload.

**Input**: Any task creation, modification, or deletion  
**Process**:
  1. Task data serialized to JSON
  2. Stored in browser's localStorage API
  3. On page load, deserialized and restored to memory

**Output**: Tasks available immediately after page reload; survives browser close/restart  
**Constraint**: Data limited by browser storage limits (~5-10MB per domain)  
**Entity Impact**: Task collection persisted as JSON array in localStorage

---

## 3. Business Rules (RN01–RN07)

| Rule | Description | Enforcement |
|------|-------------|------------|
| **RN-001** | Title, discipline, and due date are mandatory; tasks cannot be created or saved without these fields | Form validation (RF-002); prevent submission if empty |
| **RN-002** | Priority must be one of: "Low", "Medium", or "High"; defaults to "Medium" if not specified | Dropdown/select in UI; defaults to Medium on creation |
| **RN-003** | Every new task is created in "Pending" status by default; users must explicitly mark tasks as "Completed" | Task.status = "Pending" on creation; requires RF-004 to change |
| **RN-004** | Task deletion always requires confirmation; there is no "undo" after confirmation (permanent deletion) | Modal confirmation (RF-006); no recovery mechanism |
| **RN-005** | Completed tasks remain in storage and visible according to the active filter (not auto-archived) | Filter toggles (RF-007) show/hide; no auto-removal |
| **RN-006** | No task can have a duplicate ID; IDs must be unique within localStorage | ID generation: timestamp or UUID-like string at creation time |
| **RN-007** | All field values (especially title and discipline) are trimmed of leading/trailing whitespace before storage | `.trim()` applied to string inputs before save |

---

## 4. Task Entity Schema

### Entity: Task

**Purpose**: Represents a single academic assignment, project, test, or coursework item.

**Storage**: JSON objects serialized in localStorage array.

**Unique Identifier**: `id` (timestamp-based or UUID-like string)

### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | String (UUID/Timestamp) | ✅ Yes | Auto-generated | Unique identifier; generated at creation time (e.g., `Date.now()` or UUID-like string) |
| `title` | String | ✅ Yes | — | Task name/description; non-empty, trimmed (RN-007); max ~500 chars |
| `discipline` | String | ✅ Yes | — | Course/subject name; non-empty, trimmed (RN-007); examples: "Math", "History", "Physics" |
| `dueDate` | String (ISO 8601 or user format) | ✅ Yes | — | Target completion date; can be past/future; format: "YYYY-MM-DD" or user browser default |
| `priority` | String (Enum) | ✅ Yes | `"Medium"` | Importance level: `"Low"`, `"Medium"`, `"High"` (RN-002) |
| `status` | String (Enum) | ✅ Yes | `"Pending"` | Completion state: `"Pending"` or `"Completed"` (RN-003, RN-005) |
| `createdAt` | Number (Timestamp) | ✅ Yes | Auto-generated | Unix timestamp of task creation; immutable after creation |
| `updatedAt` | Number (Timestamp) | ✅ Yes | Auto-generated | Unix timestamp of last modification; updated on any field change |

### Example Task Record (JSON)

```json
{
  "id": "1719696600000",
  "title": "Complete Mathematics Assignment Chapter 5",
  "discipline": "Advanced Mathematics",
  "dueDate": "2026-07-15",
  "priority": "High",
  "status": "Pending",
  "createdAt": 1719696600000,
  "updatedAt": 1719696600000
}
```

### Entity Constraints

- **id**: Must be unique across all tasks in localStorage (RN-006)
- **title**: Non-empty after trim; typical range 1-500 characters
- **discipline**: Non-empty after trim; typical range 1-100 characters
- **dueDate**: Valid date; can be past or future (edge case: system allows past dates)
- **priority**: MUST be one of exactly three values: "Low" | "Medium" | "High"
- **status**: MUST be one of exactly two values: "Pending" | "Completed"
- **createdAt**: Immutable; set once at creation
- **updatedAt**: Updated automatically on any modification

---

## 5. Requirement-Rule-Entity Traceability Matrix

| Req | Rule(s) | Entity Fields | Purpose |
|-----|---------|---------------|---------|
| RF-001 | RN-001, RN-002, RN-003 | id, title, discipline, dueDate, priority, status, createdAt, updatedAt | Capture all task data and initialize with defaults |
| RF-002 | RN-001, RN-007 | title, discipline, dueDate, priority | Validate mandatory fields and apply defaults |
| RF-003 | RN-005 | all fields | Display task list with all attributes visible |
| RF-004 | RN-003, RN-005 | status, updatedAt | Track completion state and modification time |
| RF-005 | RN-001, RN-007 | All updateable fields | Preserve integrity while allowing edits |
| RF-006 | RN-004, RN-006 | id | Permanently remove task by unique identifier |
| RF-007 | RN-005 | status | Filter display based on completion state |
| RF-008 | RN-006 | all fields | Serialize and persist to localStorage |

---

## 6. Primary Workflows

### 6.1 Create Task

**Trigger**: User clicks "Create Task" button  
**Input**: Form data (title, discipline, dueDate, priority)  
**Process**:
1. Validate: title, discipline, dueDate not empty (RF-002, RN-001)
2. Trim whitespace from title and discipline (RN-007)
3. Default priority to "Medium" if not specified (RN-002, RF-002)
4. Set status to "Pending" (RN-003, RF-002)
5. Generate unique id (timestamp or UUID) (RN-006)
6. Set createdAt to current timestamp (auto)
7. Set updatedAt to current timestamp (auto)
8. Create Task record
9. Add to in-memory task collection
10. Persist collection to localStorage (RF-008)
11. Refresh task list display (RF-003)
12. Clear form and show success confirmation

**Output**: New task visible in list with all fields populated  
**Error Handling**: Display validation errors for missing mandatory fields; prevent submission

---

### 6.2 List Tasks

**Trigger**: Application load or after any task operation  
**Input**: Current filter setting (All/Pending/Completed)  
**Process**:
1. Load task collection from localStorage (RF-008)
2. Parse JSON to Task objects
3. Apply active filter:
   - If "Pending": filter where Task.status = "Pending"
   - If "Completed": filter where Task.status = "Completed"
   - If "All": display all tasks
4. Sort tasks (chronological by dueDate or by createdAt)
5. Render task list with each task showing:
   - title, discipline, dueDate, priority, status (checkbox/toggle)
   - action buttons: Edit, Delete
6. Display empty state message if no tasks match filter

**Output**: Rendered list of Task objects; interactive UI for task management  
**State**: Filter preference may be persisted for consistency across sessions

---

### 6.3 Edit Task

**Trigger**: User clicks "Edit" button on a task  
**Input**: Task id and updated field values (title, discipline, dueDate, priority, status)  
**Process**:
1. Load existing Task by id from collection
2. Display edit form pre-populated with current values
3. User modifies one or more fields
4. On submit:
   - Validate: title, discipline, dueDate not empty (RF-002, RN-001)
   - Trim whitespace (RN-007)
   - Verify priority is valid (RN-002)
   - Verify status is valid (RN-003)
5. Update Task fields (preserve id and createdAt)
6. Set updatedAt to current timestamp
7. Update Task in collection
8. Persist to localStorage (RF-008)
9. Refresh task list display (RF-003)
10. Show success confirmation

**Output**: Task updated with new values; updatedAt timestamp changed  
**Error Handling**: Validation errors prevent save; maintain edit form open for correction

---

### 6.4 Change Task Status (Mark Complete/Pending)

**Trigger**: User clicks checkbox or "Mark Complete/Pending" button  
**Input**: Task id and new status ("Completed" or "Pending")  
**Process**:
1. Load Task by id from collection
2. Toggle status:
   - If "Pending": change to "Completed"
   - If "Completed": change to "Pending"
3. Set updatedAt to current timestamp
4. Update Task in collection
5. Persist to localStorage (RF-008)
6. Refresh task list (may change visibility if filter active)

**Output**: Task status changed; list re-rendered with updated visual state  
**Feedback**: Instant visual change in checkbox/toggle state

---

### 6.5 Delete Task

**Trigger**: User clicks "Delete" button on a task  
**Input**: Task id  
**Process**:
1. Display confirmation modal dialog:
   - Message: "Are you sure you want to delete this task?"
   - Buttons: "Confirm" | "Cancel"
2. If "Cancel": dismiss modal; task remains unchanged
3. If "Confirm":
   - Remove Task by id from collection (RN-004, RN-006)
   - Persist updated collection to localStorage (RF-008)
   - Refresh task list display (RF-003)
   - Show success confirmation
4. No undo mechanism (permanent deletion)

**Output**: Task removed from list permanently; collection updated in localStorage  
**Error Handling**: If deletion fails (edge case), display error; task remains in list

---

### 6.6 Filter Tasks

**Trigger**: User clicks filter button/toggle (All/Pending/Completed)  
**Input**: Selected filter option  
**Process**:
1. Save filter preference (optional: store in localStorage or session)
2. Load task collection from localStorage
3. Filter collection based on selected option:
   - **All**: No filtering; show all tasks
   - **Pending**: Keep only tasks where Task.status = "Pending"
   - **Completed**: Keep only tasks where Task.status = "Completed"
4. Re-render task list with filtered tasks
5. Update filter UI to show active selection
6. Display empty state if no tasks match filter

**Output**: Task list re-rendered showing only matching tasks  
**Persistence**: If new task created while filter active, it appears only if it matches filter (or filter auto-resets to "All")

---

## 7. Validation Constraints & Edge Cases

### Input Validation Rules

| Field | Validation | Error Message |
|-------|----------|---------------|
| **title** | Non-empty after trim; max 500 chars | "Title is required" or "Title too long" |
| **discipline** | Non-empty after trim; max 100 chars | "Discipline is required" or "Discipline too long" |
| **dueDate** | Valid date format; any past/future date allowed | "Invalid date format; use YYYY-MM-DD" |
| **priority** | Must be "Low", "Medium", or "High" (case-sensitive) | "Priority must be Low, Medium, or High" |
| **status** | Must be "Pending" or "Completed" | "Invalid status; use Pending or Completed" |
| **id** | Unique; auto-generated; immutable | "Duplicate ID detected (critical error)" |

### Edge Cases & Handling

| Edge Case | Scenario | Expected Behavior |
|-----------|----------|------------------|
| **Empty Task List** | No tasks created | Display empty state message (e.g., "No tasks yet. Create one to get started.") |
| **Long Task Title** | User enters 500+ character title | Truncate display with ellipsis; store full text; display full on hover or edit |
| **Past Due Date** | User enters date already passed (e.g., 2026-01-01) | Allow submission; optionally warn user ("This date is in the past") |
| **Very Long Discipline Name** | User enters "Advanced AP Physics Honors with Lab (H)" | Truncate display; store full text; responsive wrapping on mobile |
| **All Tasks Deleted** | User deletes all tasks and reloads page | localStorage is empty; empty state displayed; counter shows 0 |
| **localStorage Unavailable** | Private browsing; storage disabled by browser | Graceful degradation: operate in-memory; warn user data lost on reload |
| **Page Refresh During Edit** | User closes browser while editing (form not submitted) | Unsaved changes discarded; return to previous list state on reload |
| **Browser Tab Closed** | User closes browser with unsaved changes | Data lost; only localStorage-persisted data remains on next session |
| **localStorage Quota Exceeded** | 100+ tasks with long titles fill ~10MB | Handle gracefully: warn user; allow deletion to free space; consider pagination for v2 |
| **Duplicate Task IDs** | System error: two tasks generate same id | Critical error; prevent; use timestamp + random or UUID to avoid |
| **Invalid JSON in localStorage** | Storage corrupted; JSON parse fails | Graceful degradation: clear corrupted data; start fresh; log error to console |
| **Priority/Status Typo** | localStorage manually edited; status = "pending" (lowercase) | Normalize on load (toLowerCase) or treat as invalid; default to "Pending" |
| **Multiple Browser Tabs** | User creates task in Tab 1; Tab 2 has stale data | Tab 2 sees task on refresh; localStorage is shared but in-memory state differs; no real-time sync |

### Data Integrity Constraints

- **Atomic Operations**: Task creation, update, and deletion must be atomic (all-or-nothing) to prevent partial data loss
- **localStorage Serialization**: Task collection must be serializable to JSON; avoid circular references or non-JSON-compatible data types
- **Timestamp Accuracy**: createdAt is immutable; updatedAt automatically updated; use millisecond precision
- **ID Uniqueness**: ID generation must guarantee uniqueness; use Date.now() + random suffix or UUID library
- **Field Trimming**: String inputs must be trimmed before storage and validation to prevent whitespace issues
- **Enum Enforcement**: priority and status must strictly enforce allowed values; no free-form strings

---

## 8. System Data Flow

```
┌──────────────┐
│  User Input  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│  Validation              │
│  - Mandatory fields      │
│  - Field trimming        │
│  - Type/enum checks      │
└──────┬───────────────────┘
       │
       ├─ INVALID ─► Display error message ◄─────┐
       │                                          │
       └─ VALID                                   │
              │                                   │
              ▼                                   │
       ┌─────────────────┐                        │
       │  Task Operation │                        │
       │  - Create       │                        │
       │  - Update       │                        │
       │  - Delete       │                        │
       │  - Status       │                        │
       └────────┬────────┘                        │
                │                                 │
                ▼                                 │
       ┌─────────────────┐                        │
       │  Update Task    │                        │
       │  Collection     │                        │
       │  (in-memory)    │                        │
       └────────┬────────┘                        │
                │                                 │
                ▼                                 │
       ┌─────────────────┐                        │
       │  Serialize &    │                        │
       │  Persist to     │                        │
       │  localStorage   │                        │
       └────────┬────────┘                        │
                │                                 │
                ▼                                 │
       ┌─────────────────┐                        │
       │  Re-render      │                        │
       │  Task List      │                        │
       │  (apply filter) │                        │
       └────────┬────────┘                        │
                │                                 │
                ▼                                 │
       ┌─────────────────┐                        │
       │  Display Update │                        │
       │  + Success      │                        │
       │  Message        │                        │
       └────────┬────────┘                        │
                │ (if error occurs)               │
                └────────────────────────────────┘
```

---

## 9. Consistency with Constitution

### Principle Alignments

| Principle | Application in Schema |
|-----------|----------------------|
| **No External Dependencies** | Task and collection managed with pure JavaScript; no external libraries |
| **Modularity & Code Organization** | Storage, validation, UI, and filtering logic must be in separate modules |
| **localStorage-Based Persistence** | Task collection serialized to JSON in localStorage; no backend |
| **Responsive & Accessible Design** | Task list renders on all screen sizes; form labels and status indicators accessible |
| **Input Validation (NON-NEGOTIABLE)** | RF-002 and validation table enforce mandatory fields and type checking |
| **User Confirmation for Destructive Actions** | RF-006 requires modal confirmation before deletion; no silent deletions |
| **Static Site Deployment** | Schema fully compatible with static HTML/CSS/JavaScript deployment |

---

## 10. Schema Versioning

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-06-29 | Initial schema based on spec v1.0.0; 8 requirements, 7 business rules, Task entity defined |

---

**Schema Status**: ✅ Active and ready for implementation  
**Next Phase**: Technical planning via `/speckit.plan`
