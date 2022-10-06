module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    pageurl: 'https://www.saucedemo.com',
  },
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './output/index.html',
        includeFailureMsg: true,
      },
    ],
  ],
};
