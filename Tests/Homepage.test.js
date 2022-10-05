const HomePageMA = require("../Pages/homepage");
describe("TestingShahid", () => {
  it("Visiting google page", async () => {
    await HomePageMA.vitispage("google");
  });
});

describe("Testing New Framework Insta", () => {
  it("Visiting insta page", async () => {
    await HomePageMA.vitispage("instagram");
  });
});
