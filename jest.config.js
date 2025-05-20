export default {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'node',
  verbose: true, // Enable verbose mode to log each test and its output
  testResultsProcessor: "jest-sonar-reporter", // Add a test results processor for detailed output
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "./html-report",
      "filename": "test-report.html",
      "expand": true,
      "pageTitle": "Detailed Test Report",
      "includeFailureMsg": true,
      "includeConsoleLog": true
    }]
  ]
};