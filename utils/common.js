const TestData = require('../configs/global_test_data');
const { extname, join } = require('path');

const fs = require('fs-extra');
const jsonMerge = require('json-merger');
class CommonUtils {
  loadLocatorsAndTestData() {
    let jsonFile = [];
    let pageelementlocatorfiles = this.getFileFromDir('locators', ['.json']);
    for (let pages = 0; pages < pageelementlocatorfiles.length; pages++) {
      jsonFile[pages] = pageelementlocatorfiles[pages];
    }
    TestData.setField('LocatorList', jsonMerge.mergeFiles(jsonFile));

    let jsonFileData = [];
    let testdatafiles = this.getFileFromDir('Testdata', ['.json']);
    for (let datafile = 0; datafile < testdatafiles.length; datafile++) {
      jsonFileData[datafile] = testdatafiles[datafile];
    }
    TestData.setField('DataList', jsonMerge.mergeFiles(jsonFileData));
  }
  getFileFromDir(dir, fileTypes) {
    let filesToReturn = [];
    function walkDir(curPath) {
      let files = fs.readdirSync(curPath);
      for (let file in files) {
        let curFile = join(curPath, files[file]);
        if (fs.statSync(curFile).isFile() && fileTypes.indexOf(extname(curFile)) != -1) {
          filesToReturn.push(curFile);
        } else if (fs.statSync(curFile).isDirectory()) {
          walkDir(curFile);
        }
      }
    }
    walkDir(dir);
    console.log(`files to return ${filesToReturn}`);
    return filesToReturn;
  }
  identifyLocator(locator) {
    if (typeof TestData.getLocator(locator) !== 'undefined') {
      return TestData.getLocator(locator);
    } else {
      return locator;
    }
  }
  identifyData(value) {
    if (typeof TestData.getField(value) !== 'undefined') {
      return TestData.getField(value);
    } else if (typeof TestData.getData(value) !== 'undefined') {
      return TestData.getData(value);
    } else {
      return value;
    }
  }
}

module.exports = new CommonUtils();
