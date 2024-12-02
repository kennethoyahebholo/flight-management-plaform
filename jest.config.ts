import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'setupTests.ts',
    'index.tsx',
    '/src/tests/e2e/'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/src/tests/e2e/', // Ignore the Playwright E2E test folder
    '\\.spec\\.ts$' // Ignore all files ending with `.spec.ts`
  ],
  moduleNameMapper: {
    '\\.module\\.(css|scss)$': 'identity-obj-proxy', // Use identity-obj-proxy for CSS modules
    '\\.(css|scss)$': 'identity-obj-proxy', // Use identity-obj-proxy for regular CSS
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'] // Update path to point to src directory
};

export default config;
