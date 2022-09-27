const TestData = require("../configs/global_test_data");
const assert = require("assert");
const { exec, execSync } = require("child_process");
const { extname, join } = require("path");

const _ = require("lodash");
const fs = require("fs-extra");
const jsonMerge = require("json-merger");
const moment = require("moment");

// const { globals, helpers } = require("../configs/core.js").config;
// const mobilePlugins = require("../configs/mobile_plugins.json");
// const logger = LoggerFactory.init();
// const config = require("codeceptjs").config.get();

class CommonUtils {
  loadLocatorsAndTestData() {
    let jsonFile = [];
    let pageelementlocatorfiles = this.getFileFromDir("locators", [".json"]);
    for (let pages = 0; pages < pageelementlocatorfiles.length; pages++) {
      jsonFile[pages] = pageelementlocatorfiles[pages];
    }
    TestData.setField("LocatorList", jsonMerge.mergeFiles(jsonFile));
  }
  getFileFromDir(dir, fileTypes) {
    let filesToReturn = [];
    function walkDir(curPath) {
      let files = fs.readdirSync(curPath);
      for (let file in files) {
        let curFile = join(curPath, files[file]);
        if (
          fs.statSync(curFile).isFile() &&
          fileTypes.indexOf(extname(curFile)) != -1
        ) {
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
    if (typeof TestData.getLocator(locator) !== "undefined") {
      return TestData.getLocator(locator);
    } else {
      return locator;
    }
  }

  async compareFieldValuesWithList(locator, expectedData) {
    logger.debug("Locator value of field " + this.identifyLocator(locator));
    var actualDropdownValues = await I.grabTextFromAll(
      this.identifyLocator(locator)
    );
    actualDropdownValues = actualDropdownValues.map((string) => string.trim());
    var expectedDataList = expectedData[0].split(",");
    expectedDataList = expectedDataList.map((string) => string.trim());
    assert.strictEqual(
      _.isEqual(actualDropdownValues, expectedDataList),
      true,
      "Dropdown values doesnt match"
    );
  }

  /**
   * Parses the table from a BDD test scenario step
   *
   * @param {object} table The CodeceptJS table from the BDD step
   * @param {boolean} [regenerate=true] Indicates if a placeholder value should be replaced with a newly generated or the previously generated value
   * @returns {Promise<object>} The parsed object with the table's first element as key and second element as value
   */
  async parseTable(table, regenerate = true) {
    await this._validateTable(table);
    let parsedData = {};
    const table2D = table.parse().raw();
    for (const tableRow of table2D) {
      parsedData[tableRow[0]] = tableRow[1];
    }

    parsedData = await this.replacePlaceholderValues(parsedData, regenerate);
    await I.report(`Parsed table: ${this.beautify(parsedData)}`);
    return parsedData;
  }

  /**
   * Replaces any placeholder values with the preset or generated values
   *
   * @param {object} data The current data of the API request/response in the axios config
   * @param {boolean} regenerate Flag to indicate the usage of a previously generated UUID
   */
  async replacePlaceholderValues(data, regenerate = true) {
    let modData = _.cloneDeep(data);

    for (let [key, value] of Object.entries(modData)) {
      // First capturing group ([\w\s]+) - any word and whitespace characters
      // Non capturing group (?: ...)? - one or zero occurence of the operator and the operand below
      // Second capturing group ([-+*/]) - the mathematical operator
      // Third capturing group (\d+) - the operand
      let match = /{{ ([\w\s]+)(?: ([-+*/]) (\d+))? }}/g.exec(value);
      if (match) {
        let presetKey = match[1];
        let operator = match[2];
        let secondOperand = match[3];
        switch (presetKey) {
          case "uuid":
            this.generatedUuidHex = regenerate
              ? uuidv4().replace(/-/g, "")
              : this.generatedUuidHex;
            modData[key] = value.replace(
              new RegExp(_.escapeRegExp(`{{ ${presetKey} }}`), "g"),
              this.generatedUuidHex
            );
            break;
          default:
            // If a math expression is captured in the regexp, evaluate it then replace the placeholder value
            if (operator && secondOperand) {
              modData[key] = value.replace(
                new RegExp(
                  _.escapeRegExp(
                    `{{ ${presetKey} ${operator} ${secondOperand} }}`
                  ),
                  "g"
                ),
                TestData.getData("preset")[presetKey]
              );
              modData[key] = await this.evaluate(
                _.toNumber(modData[key]),
                operator,
                _.toNumber(secondOperand)
              );
            }
            // Else just simply replace the placeholder value
            else {
              modData[key] = value.replace(
                new RegExp(_.escapeRegExp(`{{ ${presetKey} }}`), "g"),
                TestData.getData("preset")[presetKey]
              );
            }
            break;
        }
      }
    }

    logger.debug(`Replaced placeholder values: ${this.beautify(modData)}`);
    return modData;
  }

  /**
   * Sleeps for the given time, use with async/await
   *
   * @param {number} milliseconds Time to sleep for in milliseconds
   * @returns {Promise} The promise which can be awaited to settle in the given time
   */
  sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /**
   * Validate that a table is properly defined in a BDD test scenario step
   *
   * @param {object} table The CodeceptJS table from the BDD step
   */
  async _validateTable(table) {
    if (table == null) {
      let errorMsg = "No table provided in BDD step";
      logger.error(errorMsg);
      await I.fail(errorMsg);
    }
  }

  async runBatchFile(fileName) {
    //runs the batch file based on the input - fileName
    if (fileName != "") {
      exec(fileName, (err, stdout) => {
        if (err) {
          logger.error(err);
          return;
        }
        logger.info("Result from batch" + stdout);
      });
    } else {
      logger.debug("filename is empty");
    }
  }
  async createDirectory(dirName, currentPath) {
    const dirPath = currentPath + "\\" + dirName;
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirName);
    } else {
      fs.readdirSync(dirPath).forEach(async (file) => {
        let curPath = dirPath + "\\" + file;
        if (!fs.lstatSync(curPath).isDirectory()) {
          await fs.unlinkSync(curPath);
        }
      });
    }
  }

  async deleteDirectory(dirPath) {
    if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
      fs.readdirSync(dirPath).forEach(async (file) => {
        let curPath = dirPath + "\\" + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          await this.deleteDirectory(curPath);
        } else {
          await fs.unlinkSync(curPath);
        }
      });
      await fs.rmdirSync(dirPath);
    }
  }

  async generateRandomNumbers(outVar, randNum) {
    let value;
    if (randNum.includes("RAND")) {
      var arr = randNum.split("_");
      let len = arr[arr.length - 1];
      if (arr.length == 2) {
        value = Math.floor(
          Math.pow(10, len - 1) +
            Math.random() * (Math.pow(10, len) - Math.pow(10, len - 1) - 1)
        );
      } else {
        value = Math.floor(
          Math.pow(10, len - 1) +
            Math.random() * (Math.pow(10, len) - Math.pow(10, len - 1) - 1)
        );
        value = arr[0] + value;
      }
    } else {
      value = this.identifyData(randNum);
    }
    TestData.setField(outVar, value);
  }

  formateDate(strDate, strFormat) {
    let addSubHour, addSubMin;
    if (
      typeof this.identifyData("AddorSubHour") !== "undefined" &&
      typeof this.identifyData("AddorSubMin") !== "undefined"
    ) {
      addSubHour = this.identifyData("AddorSubHour");
      addSubMin = this.identifyData("AddorSubMin");
    } else {
      addSubHour = 0;
      addSubMin = 0;
    }

    strDate.setHours(strDate.getHours() + parseInt(addSubHour));
    strDate.setMinutes(strDate.getMinutes() + parseInt(addSubMin));
    let formatedData;
    function pad2(n) {
      return n < 10 ? "0" + n : n;
    }
    switch (strFormat) {
      case "yyyyMMddHHmmss":
        formatedData =
          strDate.getFullYear().toString() +
          pad2(strDate.getMonth() + 1) +
          pad2(strDate.getDate()) +
          pad2(strDate.getHours()) +
          pad2(strDate.getMinutes()) +
          pad2(strDate.getSeconds());
        break;
      default:
        formatedData =
          [
            strDate.getMonth() + 1,
            strDate.getDate(),
            strDate.getFullYear(),
          ].join("-") +
          " " +
          [strDate.getHours(), strDate.getMinutes(), strDate.getSeconds()].join(
            ":"
          );
    }

    return formatedData;
  }
  /**
   *
   * @param {Object} inputObj inputObj contains key value pair details like,path to jar and other dependency jars, method to invoke and dependent parameters
   * @param {string} parameter to be changed
   */

  setUpEnvAppPackage(appType, device) {
    const deviceType = this.identifyData(device + ".DeviceType");
    if (typeof deviceType !== "undefined") {
      helpers.appium.config.desiredCapabilities.appPackage =
        mobilePlugins[deviceType][appType].package;
      helpers.appium.config.desiredCapabilities.appActivity =
        mobilePlugins[deviceType][appType].activity;
    } else {
      logger.error(deviceType + " not found");
    }
  }
}

module.exports = new CommonUtils();
// module.exports.CommonUtils = CommonUtils;
