module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    pageurl: 'https://www.saucedemo.com',
    pageurl1: 'https://www.amazon.in',
    watch_product:
      'https://www.amazon.in/Fire-Boltt-Bluetooth-Smartwatch-Monitoring-Assistant/dp/B09RKFBCV7/ref=mp_s_a_1_1_sspa?crid=10HDCTFKVNW1G&keywords=smart+watch&qid=1665474235&qu=eyJxc2MiOiI3LjIwIiwicXNhIjoiNy4yNSIsInFzcCI6IjYuNDEifQ%3D%3D&sprefix=smart+watch%2Caps%2C233&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzQklZQVU4OE5PMVdMJmVuY3J5cHRlZElkPUExMDIwMjY1NDYwVVE0U0pJNkY0JmVuY3J5cHRlZEFkSWQ9QTAxMDczNDEzT0FCVlpINzY3WlVHJndpZGdldE5hbWU9c3BfcGhvbmVfc2VhcmNoX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=',
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
