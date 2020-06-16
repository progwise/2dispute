module.exports = {
  testEnvironment: './utils/testing/jest-environment/MongoDbEnvironment.js',
  setupFiles: ['./utils/testing/setupJest.ts'],
  setupFilesAfterEnv: ['./utils/testing/setupJestFilesAfterEnv.ts'],
};
