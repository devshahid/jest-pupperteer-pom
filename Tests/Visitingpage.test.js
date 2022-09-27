const HomePageMA = require("../Pages/homepage");

describe("Testing New Framework FB", () => {
  beforeAll(async () => {
    jest.setTimeout(15000);
  });
  it("Visiting Facebook page", async () => {
    await HomePageMA.testingPage("facebook");
  });
});
