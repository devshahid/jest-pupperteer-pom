const nestedProperty = require("nested-property");

class TestData {
  constructor() {
    this.testData = {};
  }
  setField = (field, value) => {
    nestedProperty.set(this.testData, field, value);
  };
  getField = (field) => {
    if (typeof nestedProperty.get(this.testData, field) !== undefined) {
      return nestedProperty.get(this.testData, field);
    } else {
      return field;
    }
  };
  getLocator = (field) => {
    return nestedProperty.get(this.testData, "LocatorList." + field);
  };
  getData = (field) => {
    if (
      typeof nestedProperty.get(this.testData, "DataList." + field) !==
      "undefined"
    )
      return nestedProperty.get(this.testData, "DataList." + field);
    else return field;
  };
}

module.exports = new TestData();
module.exports.TestData = TestData;
