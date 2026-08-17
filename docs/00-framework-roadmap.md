# Playwright UI Automation - Framework Roadmap

## Goal

Build a maintainable Playwright UI automation framework while learning Playwright concepts through the nopCommerce application.

Application:

https://demo.nopcommerce.com/

---

# Phase 1 - Project Setup

### Topics
- Node.js
- npm
- Playwright installation
- TypeScript
- tsconfig.json
- playwright.config.ts
- Project structure
- Git repository

### Implementation
- Create Playwright project
- Configure TypeScript
- Configure baseURL
- Configure Chromium
- Configure HTML reporting
- Create first smoke test

---

# Phase 2 - Playwright Test Basics

### Topics
- test()
- expect()
- page fixture
- Browser
- BrowserContext
- Page
- Test isolation
- Test execution

### Implementation

```text
tests/home.spec.ts

Open application
      ↓
Verify page title
```

---

# Phase 3 - Locators

### Topics
- getByRole()
- getByText()
- getByLabel()
- getByPlaceholder()
- getByTestId()
- CSS selectors
- XPath
- Locator chaining
- Locator filtering
- nth()
- first()
- last()

### Goal
Learn how to identify and interact with UI elements reliably.

---

# Phase 4 - Assertions

### Topics
- toBeVisible()
- toBeHidden()
- toBeEnabled()
- toBeDisabled()
- toHaveText()
- toContainText()
- toHaveValue()
- toBeChecked()
- toHaveAttribute()
- toHaveURL()
- toHaveTitle()
- Generic assertions

### Goal
Validate actual user-visible behavior.

---

# Phase 5 - Page Object Model

### Topics
- POM concept
- Page classes
- Locators inside page classes
- Page actions
- Constructor
- Page object reuse

### Implementation

```text
pages/
├── home.page.ts
├── login.page.ts
└── search.page.ts
```

Flow:

```text
Test
 ↓
Page Object
 ↓
Locator
 ↓
Browser
```

---

# Phase 6 - Fixtures

### Topics
- Built-in fixtures
- page
- browser
- context
- request
- Custom fixtures
- Fixture dependencies
- Fixture scope

### Implementation

```text
fixtures/
└── test.fixtures.ts
```

---

# Phase 7 - Test Data

### Topics
- Static test data
- JSON data
- TypeScript test data
- Dynamic test data
- Faker
- Unique test data
- Environment variables

### Implementation

```text
test-data/
├── users.ts
├── products.ts
└── checkout.ts
```

---

# Phase 8 - Authentication

### Topics
- Login
- Authentication flow
- Reusable login
- Storage state
- Authenticated tests
- Unauthenticated tests

### Implementation

```text
tests/auth/
├── login.spec.ts
└── registration.spec.ts
```

Later introduce authenticated storage state if the application flow supports it.

---

# Phase 9 - Hooks

### Topics
- beforeAll
- beforeEach
- afterEach
- afterAll

### Goal
Understand when hooks should and should not be used.

Avoid putting unnecessary logic into hooks.

---

# Phase 10 - nopCommerce Product Automation

### Features
- Product search
- Product categories
- Product details
- Product sorting
- Product filtering
- Add to cart
- Remove from cart
- Cart quantity

### Structure

```text
tests/
├── product/
│   ├── search-product.spec.ts
│   ├── product-details.spec.ts
│   └── product-filter.spec.ts
│
└── cart/
    └── add-to-cart.spec.ts
```

---

# Phase 11 - Cart and Checkout

### Topics
- Multi-page workflows
- Page Object interaction
- Test data
- Assertions
- End-to-end scenarios

### Example flow

```text
Login
  ↓
Search product
  ↓
Open product
  ↓
Add to cart
  ↓
Open cart
  ↓
Checkout
  ↓
Enter details
  ↓
Place order
  ↓
Verify order
```

---

# Phase 12 - Parameterization

### Topics
- forEach()
- Multiple test data
- Data-driven testing
- Parameterized tests

---

# Phase 13 - Advanced Locators and UI Handling

### Topics
- Dynamic elements
- Dropdowns
- Checkboxes
- Radio buttons
- Tables
- Date pickers
- Alerts
- Popups
- Dialogs
- Frames
- Multiple tabs
- Downloads
- Uploads
- Hover
- Drag and drop

---

# Phase 14 - Waits and Synchronization

### Topics
- Auto-waiting
- Locator waiting
- Assertions as waits
- Explicit waits
- waitForURL()
- waitForLoadState()
- waitForResponse()
- Avoiding hard waits

### Goal

Understand why Playwright normally does not require:

```ts
page.waitForTimeout()
```

and when explicit waiting is actually necessary.

---

# Phase 15 - Network Handling

### Topics
- Route
- Request interception
- Response handling
- Mocking
- API + UI interaction
- waitForResponse()
- Network conditions

---

# Phase 16 - Screenshots, Video and Trace

### Topics
- Screenshots
- Video recording
- Trace viewer
- Debugging failed tests
- Error context

Configuration:

```text
trace: "on-first-retry"
screenshot: "only-on-failure"
video: "retain-on-failure"
```

---

# Phase 17 - Test Organization

### Topics
- Test grouping
- describe()
- Tags
- Smoke tests
- Regression tests
- Feature-based organization

Example:

```text
tests/
├── auth/
├── product/
├── cart/
├── checkout/
└── regression/
```

---

# Phase 18 - Multi-Browser Testing

### Browsers
- Chromium
- Firefox
- WebKit

Later add mobile projects if required.

---

# Phase 19 - Parallel Execution

### Topics
- fullyParallel
- workers
- Test isolation
- Parallel execution
- Serial execution
- Dependency considerations

---

# Phase 20 - Reporting

### Topics
- HTML report
- Screenshots
- Videos
- Trace
- Test results
- Failed test analysis

Commands:

```bash
npx playwright test
npx playwright show-report
```

---

# Phase 21 - Jenkins CI

### Topics
- Jenkins Pipeline
- Jenkinsfile
- Git checkout
- npm ci
- Playwright installation
- Test execution
- Environment variables
- Jenkins credentials
- HTML reports
- CI retries

Pipeline:

```text
GitHub
   ↓
Jenkins
   ↓
Checkout
   ↓
npm ci
   ↓
Playwright tests
   ↓
HTML report
```

---

# Phase 22 - Framework Cleanup

### Topics
- Remove duplication
- Improve naming
- Locator best practices
- Page Object responsibilities
- Fixture responsibilities
- Test readability
- Test data separation
- Configuration cleanup

### Goal

Keep the framework simple.

Do not introduce abstractions just because they are commonly seen in enterprise frameworks.

---

# Final Framework

```text
playwright-nopcommerce-ui/
│
├── pages/
│   ├── home.page.ts
│   ├── login.page.ts
│   ├── registration.page.ts
│   ├── search.page.ts
│   ├── product.page.ts
│   ├── cart.page.ts
│   └── checkout.page.ts
│
├── fixtures/
│   └── test.fixtures.ts
│
├── test-data/
│   ├── users.ts
│   ├── products.ts
│   └── checkout.ts
│
├── tests/
│   ├── auth/
│   ├── product/
│   ├── cart/
│   └── checkout/
│
├── docs/
│   ├── 01-project-setup.md
│   ├── 02-framework-roadmap.md
│   ├── 03-playwright-basics.md
│   ├── 04-locators.md
│   ├── 05-page-object-model.md
│   ├── 06-fixtures.md
│   ├── 07-test-data.md
│   ├── 08-authentication.md
│   ├── 09-ui-test-scenarios.md
│   ├── 10-debugging-and-reporting.md
│   └── 11-jenkins-ci.md
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
└── .gitignore
```

---

# Learning Approach

For each feature:

```text
1. Learn the Playwright concept
        ↓
2. Implement it
        ↓
3. Write the test
        ↓
4. Refactor into framework
        ↓
5. Run and verify
        ↓
6. Document the concept
```

The goal is not only to create a working automation framework, but to understand why each part exists and when to use it.
