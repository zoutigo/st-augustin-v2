import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/actions/(.*)$': '<rootDir>/actions/$1',
    '^@/schemas/(.*)$': '<rootDir>/schemas/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^next-auth/react$': '<rootDir>/__mocks__/next-auth-react-mock.js', // Ajoute un mock pour next-auth/react
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Utilise babel-jest pour transformer TS, JS, et JSX
  },
  transformIgnorePatterns: [
    '/node_modules/(?!next-auth)', // Forcer Jest à transformer next-auth
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
