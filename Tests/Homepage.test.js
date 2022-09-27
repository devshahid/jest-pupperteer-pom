const HomePageMA = require("../Pages/homepage");
describe("TestingShahid", () => {
  beforeAll(async () => {
    jest.setTimeout(15000);
  });
  it("Visiting google page", async () => {
    await HomePageMA.vitispage("google");
  });
});

describe("Testing New Framework Insta", () => {
  beforeAll(async () => {
    jest.setTimeout(15000);
  });
  it("Visiting insta page", async () => {
    await HomePageMA.vitispage("instagram");
  });
});
