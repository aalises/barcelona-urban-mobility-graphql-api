module.exports = {
  clearMocks: true,
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**"],
  coverageReporters: ["lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "dist", "/__tests__/"],
  testPathIgnorePatterns: ["node_modules", "dist"],
};
