<!--
  Sync Impact Report - Version 1.0.0

  Version Change: None → 1.0.0

  Modified Principles:
  - Initial creation of all principles

  Added Sections:
  - Core Principles (Code Quality, Testing Standards, User Experience, Performance)
  - Development Workflow
  - Quality Gates
  - Governance

  Removed Sections: None

  Templates Status:
  ✅ plan-template.md - Constitution Check section aligns with principles
  ✅ spec-template.md - Mandatory sections align with quality standards
  ✅ tasks-template.md - Task categorization aligns with test-first principle

  Follow-up TODOs: None
-->

# YouTube Learning App Constitution

## Core Principles

### I. Code Quality Excellence

Code MUST adhere to these non-negotiable standards:

- **Clarity over Cleverness**: Code is written to be read and maintained. Prefer explicit, self-documenting code over clever shortcuts.
- **Separation of Concerns**: Each module, component, or function MUST have a single, well-defined responsibility.
- **DRY with Judgment**: Avoid duplication of logic, but do not force abstractions prematurely. Three instances of similar code may warrant refactoring; two may not.
- **Consistent Patterns**: Within the codebase, similar problems MUST be solved in similar ways. Architectural patterns (e.g., service layer structure, error handling) MUST be consistent across modules.
- **Type Safety**: Leverage TypeScript's type system fully. Avoid `any` types except when interfacing with truly dynamic external systems; use `unknown` and type guards instead.
- **Error Handling**: All error paths MUST be explicitly handled. No silent failures. Errors MUST be logged with sufficient context for debugging.

**Rationale**: High code quality reduces bugs, accelerates onboarding, and ensures the codebase remains maintainable as it grows. Consistency reduces cognitive load for developers.

### II. Testing Standards (NON-NEGOTIABLE)

Testing is mandatory and MUST follow this discipline:

- **Test-First for New Features**: When adding new functionality, tests MUST be written before implementation. The Red-Green-Refactor cycle is strictly enforced:
  1. Write test(s) that define expected behavior
  2. Verify tests fail (Red)
  3. Implement minimum code to pass tests (Green)
  4. Refactor while keeping tests green
- **Test Coverage Requirements**:
  - **Unit Tests**: All business logic, utility functions, and data transformations MUST have unit tests
  - **Integration Tests**: API endpoints, database interactions, and external service integrations MUST have integration tests
  - **Component Tests**: React components with complex logic or state management MUST have component tests
- **Test Quality Standards**:
  - Tests MUST be independent and idempotent (can run in any order, multiple times)
  - Tests MUST have clear Given-When-Then structure or Arrange-Act-Assert pattern
  - Test names MUST clearly describe what is being tested and expected outcome
  - Tests MUST NOT depend on external state (databases, APIs) except in designated integration test suites
- **Mocking Strategy**: Mock external dependencies (APIs, databases) in unit tests. Use real implementations in integration tests with test fixtures or containers.

**Rationale**: Test-first development catches bugs early, documents intended behavior, and enables confident refactoring. Comprehensive testing is the foundation of software reliability.

### III. User Experience Consistency

User-facing features MUST provide a consistent, high-quality experience:

- **Visual Consistency**: UI components MUST adhere to the established design system. Use shared components from `/src/components` rather than creating one-off implementations.
- **Interaction Patterns**: Similar user actions (e.g., form submission, error display, loading states) MUST behave consistently across the application.
- **Accessibility**: All interactive elements MUST be keyboard-navigable. Color contrast MUST meet WCAG AA standards. Screen reader compatibility MUST be verified for key workflows.
- **Responsive Design**: The interface MUST be usable on mobile (320px+), tablet (768px+), and desktop (1024px+) viewports.
- **Error Communication**: User-facing errors MUST be clear, actionable, and non-technical. Avoid exposing stack traces or internal error codes to end users.
- **Loading & Feedback**: Asynchronous operations MUST provide immediate visual feedback (loading spinners, progress indicators). User actions MUST feel responsive (<100ms acknowledgment).

**Rationale**: Consistency builds user trust and reduces friction. Accessible design expands the user base. Clear feedback prevents user confusion and support requests.

### IV. Performance Requirements

The application MUST meet these performance standards:

- **Response Time Targets**:
  - API endpoints MUST respond within 500ms at p95 under expected load
  - Page initial render MUST complete within 2 seconds on 3G network
  - Interactive elements MUST respond within 100ms of user action
- **Resource Constraints**:
  - Frontend bundle size MUST NOT exceed 500KB gzipped for initial load
  - Server memory usage MUST remain under 512MB per instance under normal load
  - Database queries MUST be indexed; full table scans are prohibited in production
- **Scalability Considerations**:
  - Features MUST be designed to handle at least 1000 concurrent users
  - N+1 query problems MUST be avoided; use eager loading or batching
  - Large data sets MUST be paginated (max 100 items per request)
- **Performance Monitoring**: All API endpoints MUST emit metrics (response time, error rate). Performance regressions in CI MUST block deployment.

**Rationale**: Performance directly impacts user satisfaction and retention. Proactive performance standards prevent technical debt and ensure the application scales.

## Development Workflow

### Code Review Requirements

All code changes MUST go through peer review before merging:

- **Review Criteria**:
  - Code adheres to principles I-IV above
  - Tests are present and passing
  - No obvious security vulnerabilities (SQL injection, XSS, credential exposure)
  - Documentation is updated if public APIs changed
- **Approval Threshold**: At least one approval from a team member required
- **Self-Review Prohibition**: Authors MUST NOT approve their own pull requests

### Commit Standards

- **Conventional Commits**: Use format `type(scope): description` where type is `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
- **Atomic Commits**: Each commit MUST represent a single logical change
- **Commit Messages**: MUST explain WHY the change was made, not just WHAT changed

### Branch Strategy

- **main**: Production-ready code only. Protected branch.
- **Feature Branches**: Named `feature/###-description` where ### is issue number
- **Hotfix Branches**: Named `hotfix/description` for urgent production fixes

## Quality Gates

Before any feature is considered complete, it MUST pass these gates:

1. **Constitution Compliance**: Verify adherence to all principles I-IV
2. **Test Coverage**: Minimum 80% line coverage for new code (enforced by CI)
3. **Performance Baseline**: No regressions in response time or bundle size (measured in CI)
4. **Accessibility Audit**: Key user workflows verified with screen reader and keyboard-only navigation
5. **Security Scan**: No high or critical vulnerabilities reported by automated security scanning
6. **Code Review Approval**: At least one approving review from team member

**Gate Enforcement**: CI pipeline MUST enforce gates 2, 3, and 5 automatically. Gates 1, 4, and 6 are human-verified.

## Governance

### Amendment Process

This constitution governs all development practices. To amend:

1. **Proposal**: Document proposed change with justification
2. **Review**: Team discusses impact and alternatives
3. **Approval**: Requires consensus from majority of active contributors
4. **Migration**: Update affected templates, documentation, and CI configuration
5. **Version Bump**: Increment version following semantic versioning

### Versioning Policy

- **MAJOR**: Backward-incompatible changes (e.g., removing a principle, changing fundamental workflow)
- **MINOR**: New principles added, material expansion of existing guidance
- **PATCH**: Clarifications, wording improvements, typo fixes

### Compliance & Enforcement

- All pull requests MUST be verified against this constitution during code review
- Violations MUST be documented and justified in complexity tracking (see plan-template.md)
- Systematic violations indicate a need for constitution amendment rather than repeated exceptions

### Living Document

This constitution is intended to evolve with the project. When practices consistently conflict with stated principles, the constitution MUST be updated to reflect reality or practices MUST change to align with principles.

**Version**: 1.0.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01
