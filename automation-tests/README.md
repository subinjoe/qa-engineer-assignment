# Playwright Automation Project

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Project Analysis and Execution](#project-analysis-and-execution)
    - [Task Planning](#task-planning)
    - [Technical Solution](#technical-solution)
    - [Accessibility and Visual Testing](#accessibility-and-visual-testing)
    - [Design Pattern Choice](#design-pattern-choice)
    - [Implementation](#implementation)
    - [Execution](#execution)
- [Reporting and Documentation](#reporting-and-documentation)
- [Best Practices](#best-practices)

## Introduction
This project is an assignment automation suite built using the [Playwright](https://playwright.dev/) framework. It is designed to automate and test key functionalities of a web application, ensuring that the application behaves as expected across different scenarios and browsers.

## Project Structure
This project has all the test related files within automation-tests folder. This folder structure is explained below: 

```plaintext
.
├── automation-tests/               # Main folder for all automation-related code
│   ├── tests/                      # Test files
│   │   ├── questionAnswer.spec.ts  # Question and Answer feature tests
│   │   └── ...                     # Additional test files
│   ├── pages/                      # Page Object Model files
│   │   ├── questionAnswerPage.ts   # Question and Answer page object
│   │   └── ...                     # Additional page objects
│   ├── utils/                      # Utility functions
│   │   ├── questionAnswerData.ts   # Data functions
│   │   └── ...                     # Additional utility helper functions
│   ├── README.md                   # This file
├── automation-report/              # Test reports
├── playwright.config.js            # Playwright configuration file
├── package.json                    # NPM dependencies and scripts
└── README.md                       # README of the development project
```

## Prerequisites
Before running the tests, ensure you have the following installed:
- **Node.js** (v14.x or higher)
- **npm** or **yarn**

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/playwright-automation.git
   cd playwright-automation
   ```

2. Install dependencies:
    ```bash
    npm ci
    ```

## Running Tests

1. Running All Tests

    ```bash
    npm run automation
    ```

2. Running test in specific browser

    ```bash
    npm run automation -- --project=chromium
    ```

3. Running test with specific tag

    ```bash
    npm run automation -- --grep @fast
    ```

3. Running test with skipping specific tag

    ```bash
    npm run automation -- --grep-invert @knownIssue
    ```

4. Run test and update snapshot

    ```bash
    npm run automation -- --update-snapshots
    ```

## Project Analysis and execution

The initial phase of the project involved a comprehensive analysis of the application's core functionality, particularly focusing on the Question and Answer (Q&A) system. The goal was to identify the critical workflows, such as creating, editing, and deleting questions and answers, as well as handling user interactions like sorting questions. This analysis helped to ensure that the automation suite would cover all essential user scenarios, including edge cases and error handling.

### Task Planning
After the analysis, tasks were planned and prioritized based on the complexity and importance of each feature. The following steps were taken:
- **Identify Key Features:** The core Q&A features were identified as the primary focus for automation.
- **Define Test Scenarios:** Test scenarios were defined for each feature, covering both the "happy path" and edge cases.
- **Create UAT Test Cases:** Test cases were created based on real-world scenarios that users are expected to perform, such as asking a question, answering a question, removing, and sorting questions.
- **Create a Timeline:** A timeline was created to manage the development of the automation suite, ensuring that each task was addressed systematically.

### Technical Solution
The [Playwright](https://playwright.dev/docs/intro) framework is used for this project due to its capabilities in providing:
- **Cross-Browser Testing:** Support for Chromium, Firefox, and WebKit, ensuring the Q&A feature works across different browsers.
- **Parallel Execution:** The ability to run tests in parallel to optimize execution time.
- **Robust API:** A rich API for interacting with web elements and managing test environments.
- **Visual Testing:** Built-in support for visual testing, which helps in detecting unintended UI changes.

## Accessibility and Visual Testing
- Used "@axe-core/playwright" to do accesibility test based on WCAG rules on the page. The test fails due to some missing accessibility constraints
- Built-in support for visual testing via Screenshot(image) and Snapshot(nom-image, html content), which helps in detecting unintended UI changes

### Design Pattern Choice
To ensure scalability, maintainability, and reusability of the test code, the **Page Object Model (POM)** design pattern was adopted. This design pattern abstracts the UI interactions into separate classes, known as "Page Objects," which represent different pages or components of the application. The benefits of using POM include:
- **Separation of Concerns:** Business logic is separated from the actual test scripts, making the codebase easier to manage.
- **Reusability:** Common UI interactions are encapsulated within Page Objects, reducing code duplication.
- **Maintainability:** Changes in the UI can be managed by updating the respective Page Object, without needing to modify the test scripts.

### Implementation
The implementation phase involved:
- **Setting Up the Project:** The Playwright project was initialized, and the necessary dependencies were installed.
- **Creating Page Objects:** Page Objects were created for each key component of the Q&A system, such as the question creation page, answer submission page, and voting mechanisms.
- **Writing Test Scripts:** Test scripts were developed for each defined scenario, utilizing the Page Objects to interact with the application.
- **Utility Functions:** Reusable utility functions were implemented to handle common tasks like data setup. Fixture is used to provide setup and teardown code.

### Execution
Once the implementation was complete, the tests were executed using the following steps:
- **Local Execution:** Tests were initially run locally across multiple browsers to ensure coverage.
- **Parallel Execution:** Tests were executed in parallel to optimize runtime and detect potential issues when multiple tests are run concurrently.
- **Cross-Browser Testing:** Tests were executed across different browsers (Chromium, Firefox, WebKit) to ensure the Q&A features function correctly on all supported platforms.
- **CI/CD Integration:** The test suite was integrated into a Continuous Integration (CI) pipeline (e.g., GitHub Actions), triggering the tests on every push to main/master branch to ensure continuous feedback and quality assurance.
- **Skipping known issues:** Accessibility and hover are known issues in the application, hence they are skipped using **--grep-invert @knownIssue** command argument.

## Reporting and Documentation

### Reporting
- **Test Reporting:** Detailed HTML reports were generated after each test run, providing insights into test outcomes, execution time, and any failures.
- **CI/CD Reporting** Github action is used to display the test results in the test job itself.
- **Debugging:** In case of failures, Playwright’s debugging tools, such as running in headed mode and using the Playwright Inspector, were used to diagnose issues.

### Documentation
Finally, the project was documented thoroughly:
- **README.md:** This document provides comprehensive instructions for setting up, running, and extending the project.
- **Code Comments:** Key sections of the codebase were commented to explain complex logic or important decisions.
- **Onboarding Guide:** This guide is also helpful for new team members, explaining the project structure, coding standards, and best practices.


## Best Practices

- Use Page Object Model (POM): To keep your tests maintainable and readable.
- Use "getByRole": prioritizing user-facing attributes.
- Write functions in page object for actions on elements.
- Avoid Hard-Coding: Use environment variables and configuration files for settings.
- Test Data Management: Ensure your tests are independent by generating or cleaning up test data dynamically.
- Helper functions are grouped in helper file to avoid code duplication and promote separation.
- Parallel Execution: Optimize test run time by leveraging parallel execution.