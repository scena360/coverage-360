module.exports = {
  preset: 'jest-puppeteer',
  // roots: ['<rootDir>/src'],
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  testRegex: './*\\.test\\.jsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', 'dist', 'build'],
  testTimeout: 400000,
};
