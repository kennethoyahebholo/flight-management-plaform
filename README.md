# SwitchAir

A frontend application designed to manage flight information, allowing users to create, update, and view flight details through seamless integration with a provided API. The project focuses on delivering a responsive and user-friendly interface to streamline flight management tasks.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Assumptions](#assumptions)
3. [Running the Application Locally](#running-the-application-locally)
4. [Running Tests Locally](#running-tests-locally)
5. [Folder Structure](#folder-structure)
6. [Technologies Used](#technologies-used)

## Setup Instructions

1. **Clone the repository**

   First, clone the repository from GitHub:

   ```bash
   git clone https://github.com/kennethoyahebholo/flight-management-platform.git
   ```

2. **Change Directory**

   Navigate to the project directory using the following command:

   ```bash
   cd flight-management-platform
   ```

3. **Install Dependencies**

   The project uses npm to manage dependencies. Run one of the following commands to install the necessary dependencies:

   ```bash
   npm install
   ```

4. **Environment Variables**

   create a .env file in the root of the project and add the necessary keys. Here’s an example .env file format:

   REACT_APP_USER_TOKEN_KEY=userToken
   REACT_APP_ENV=dev

## Assumptions

Before running the application, please ensure the following:

- **Node.js** version 16.17.1 or later is installed on your machine.
- The application is designed to run in a local development environment using **Node.js** and **React**.
- The frontend is built with **TypeScript** and the testing is done using **Playwright** (for integration tests) and **Jest** (for unit tests).
- The tests are categorized as follows:
  - **Unit Tests**: Written using **Jest** and located in various screens directory `/src/screens/Login/__tests__/`, `/src/screens/Register/__tests__/`, `/src/modal_views/flights/AddOrUpdateFlightModal/__tests__/` .
  - **Integration Tests**: Written using **Playwright** and stored in the `/src/tests/e2e/` directory.
- **Playwright** tests are compatible with modern browsers such as **Chrome**, **Firefox**, and **Safari**.

## Running the Application Locally

1. Start the development server

After installing dependencies, you can start the development server by running:

```bash
npm run dev
```

2. Build the project for production

```bash
npm run build
```

## Running Tests Locally

Running Jest Unit Tests

To run unit tests using Jest, simply run the following command:

```bash
npm test
```

Running Playwright Integration Tests

To run Playwright tests (integration tests), execute the following command:

```bash
npx playwright test
```

This will run all the Playwright tests defined in /src/tests/e2e/.

Note: Make sure that the development server is running before running Playwright tests to test against a live server.

## Folder Structure

Here is an overview of the folder structure:

### Explanation:

- **/src**: Contains all the source code for the application.
  - **/components**: React components used across the app.
  - **/redux**: Contains Redux store, slices, and actions.
  - **/tests**: Holds all test files.
    - **/e2e**: Playwright-based end-to-end tests.
    - **/unit**: Jest-based unit tests.
  - **/utils**: Helper functions and utilities.
- **/public**: Contains static assets like `index.html`, images, etc.
- **/.env**: Environment variables configuration file.
- **/package.json**: Project dependencies, scripts, and metadata.
- **/jest.config.js**: Configuration file for Jest.
- **/playwright.config.ts**: Configuration file for Playwright.

## Technologies Used

The following technologies were used to build and maintain this project:

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript that enhances development with type safety.
- **Redux**: A state management library for handling application state in a predictable manner.
- **Jest**: A testing framework for running unit tests and ensuring code reliability.
- **Playwright**: A framework for running end-to-end (e2e) tests across modern web browsers.
- **CSS Modules**: A modular CSS solution for scoped and reusable styles within React components.
- **Prettier**: An opinionated code formatter to ensure consistent code style across the project.
- **ESLint**: A static analysis tool to identify and fix problematic patterns in JavaScript/TypeScript code.
- **Axios**: A promise-based HTTP client for making requests to a backend server, often used for API interactions.
