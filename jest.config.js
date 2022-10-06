module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    pageurl: 'https://www.saucedemo.com',
  },
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'],

  // roots: ["specs"],
};
// add configurations
