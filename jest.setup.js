const CommonUtils = require('./utils/common');
jest.setTimeout(30000);
jest.retryTimes(3);
beforeAll(async () => {
  CommonUtils.loadLocatorsAndTestData();
  await page.setViewport({ width: 1300, height: 768 });
  let cookies = [
    {
      name: 'cookie1',
      value: 'val1',
      domain: 'https://www.saucedemo.com',
      domain1: 'https://www.flipkart.com',
    },
  ];
  await page.setCookie(...cookies);
});

afterAll(async () => {
  await page.deleteCookie({
    name: 'cookie1',
    domain: 'https://www.saucedemo.com',
    domain1: 'https://www.flipkart.com',
  });
});
