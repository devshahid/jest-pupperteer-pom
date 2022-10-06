const CommonUtils = require('./utils/common');

jest.setTimeout(30000);
jest.retryTimes(5);
beforeAll(async () => {
  CommonUtils.loadLocatorsAndTestData();
  let cookies = [
    {
      name: 'cookie1',
      value: 'val1',
      domain: 'https://www.saucedemo.com',
    },
  ];
  await page.setCookie(...cookies);
});

afterAll(async () => {
  await page.deleteCookie({
    name: 'cookie1',
    domain: 'https://www.saucedemo.com',
  });
});
