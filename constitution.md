<!-- SYNC_IMPACT_REPORT
Version: 0.1.0 (INITIAL)
Status: Initial constitution creation
Principles Added:
  - No External Dependencies
  - Modularity & Code Organization
  - Responsive & Accessible Design
  - Input Validation (NON-NEGOTIABLE)
  - User Confirmation for Destructive Actions
  - localStorage Data Persistence
  - Static Site Deployment

Templates requiring updates:
  ✅ plan-template.md (to be verified)
  ✅ spec-template.md (to be verified)
  ✅ tasks-template.md (to be verified)
-->

# StudyTask Constitution

A web application for managing academic tasks built with pure HTML5, CSS3, and JavaScript. This constitution establishes the non-negotiable principles and practices that guide all development decisions and quality assurance throughout the project lifecycle.

## Core Principles

### I. No External Dependencies (NON-NEGOTIABLE)
Every line of code MUST be written in pure HTML5, CSS3, and JavaScript.
No frameworks (React, Vue, Angular, etc.), libraries (jQuery, Lodash, etc.), backend services, or external dependencies are permitted.
The entire application must function as a standalone static site without build tools, transpilers, or package managers.
All functionality MUST be implemented using native browser APIs only.

**Rationale**: Ensures maximum portability, eliminates supply chain risks, guarantees GitHub Pages compatibility, and maintains complete code visibility and control.

### II. Modularity & Code Organization
Source code MUST be organized into separate, focused files by feature or concern (e.g., `task-manager.js`, `storage.js`, `ui.js`, `validation.js`).
Each module MUST have a single, clear responsibility; no catch-all utility files.
HTML, CSS, and JavaScript files MUST be kept separate and linked explicitly.
File naming and structure MUST be immediately understandable to any developer without documentation.

**Rationale**: Improves code readability, maintainability, and enables parallel development without merge conflicts.

### III. localStorage-Based Data Persistence
All task data MUST be persisted exclusively in the browser's localStorage API.
No server-side storage, databases, or backend endpoints are permitted.
Data serialization MUST be human-readable (e.g., JSON format).
localStorage access MUST be encapsulated in a dedicated storage module for resilience and testability.

**Rationale**: Ensures offline functionality, eliminates infrastructure costs, and guarantees user data privacy and control.

### IV. Responsive & Accessible Design
The interface MUST function on all screen sizes (mobile, tablet, desktop) using CSS media queries and flexible layouts only.
MUST conform to WCAG 2.1 Level AA accessibility standards: semantic HTML, ARIA labels where required, keyboard navigation support, sufficient color contrast.
MUST support all modern browsers (Chrome, Firefox, Safari, Edge) released within the last 24 months.
All interactive elements MUST have clear focus states and labels.

**Rationale**: Maximizes user reach, ensures legal/ethical accessibility compliance, and improves overall usability.

### V. Input Validation (NON-NEGOTIABLE)
All required fields MUST be validated before any processing, submission, or storage operation.
Validation MUST occur at the point of user input (real-time feedback) and before data persistence.
Error messages MUST be clear, specific, and actionable.
Validation rules MUST be defined in a centralized module to prevent duplication and ensure consistency.

**Rationale**: Prevents invalid data from entering the system, improves user experience, and maintains data integrity.

### VI. User Confirmation for Destructive Actions
Task deletion, bulk operations, or any irreversible action MUST require explicit user confirmation via a modal dialog or confirmation prompt.
Confirmation prompts MUST clearly describe what will be deleted and provide undo or cancel options where technically feasible.
No silent deletions are permitted.

**Rationale**: Prevents accidental data loss and empowers users with control over their data.

### VII. Static Site Deployment
The entire application MUST be deployable as a static site on GitHub Pages without modification.
No build step, server configuration, or environment variable is permitted during deployment.
All assets (HTML, CSS, JavaScript, images) MUST be plain files in the repository root or clearly documented subdirectories.
The `index.html` file MUST be the application entry point in the repository root.

**Rationale**: Eliminates deployment complexity, enables instant sharing and collaboration, and guarantees reproducibility.

## Technical Constraints

- **Browser APIs Only**: Use native DOM APIs (querySelector, addEventListener, fetch where applicable), Blob/File APIs, localStorage, and Web APIs.
- **No External Stylesheets**: If CSS libraries are considered essential, embed them as inline `<style>` tags or include as plain CSS files committed to the repo (no CDN links to external libraries except for frameworks explicitly forbidden).
- **Performance Standards**: Initial page load MUST complete in under 2 seconds on a 3G connection. No bundling or minification required but encouraged.
- **File Size**: Total application JavaScript MUST not exceed 500 KB uncompressed; HTML/CSS combined MUST not exceed 200 KB uncompressed.
- **Compatibility**: MUST work without JavaScript disabled (progressive enhancement for basic HTML structure and forms).

## Code Quality Standards

**Readability**: Variable names, function names, and comments MUST be in English and clearly describe intent without ambiguity.
**Naming Conventions**: Use camelCase for JavaScript variables/functions, kebab-case for CSS classes and file names.
**Comments**: High-level logic MUST be documented; each module MUST include a header comment describing its purpose.
**DRY Principle**: Repeated logic MUST be refactored into reusable functions; no copy-pasted code blocks are permitted.
**Error Handling**: All user-facing operations MUST handle and report errors gracefully; console errors MUST be minimized in production.

## Testing & Verification Strategy

- **Manual User Testing**: Core workflows (create task, edit task, delete task, filter tasks, persist data across page reloads) MUST be manually tested on ≥2 browsers and ≥2 screen sizes before release.
- **Accessibility Audit**: Use browser DevTools accessibility tree inspection; verify WCAG 2.1 AA compliance before each release.
- **localStorage Persistence Test**: Verify data survives browser restart and private/incognito sessions where applicable.
- **GitHub Pages Deployment Test**: Every release MUST be tested on a GitHub Pages staging environment before merging to main.

## Governance

**Constitution Authority**: This constitution supersedes all other project documentation and development practices. In case of conflict, the constitution prevails.

**Amendment Process**:
1. Proposed amendment MUST document the old principle, new principle, and rationale.
2. Amendment MUST be reviewed for technical feasibility and impact on existing code.
3. All dependent templates (plan, spec, tasks) MUST be audited for consistency.
4. Version number MUST be incremented according to semantic versioning:
   - **MAJOR**: Principle removal or fundamental redefinition.
   - **MINOR**: New principle added or significant expansion of existing principle.
   - **PATCH**: Wording clarifications, rationale updates, non-semantic refinements.

**Compliance Verification**:
- All pull requests MUST cite which principles they satisfy or depend on.
- Code reviews MUST validate adherence to applicable principles before merge.
- Static site deployment checklist MUST be completed before release to GitHub Pages.

**Runtime Guidance**: For day-to-day development questions not explicitly covered by this constitution, refer to [project README](../../README.md) and relevant module-level comments.

---

**Version**: 1.0.0 | **Ratified**: 2026-06-29 | **Last Amended**: 2026-06-29
