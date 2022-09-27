const execSync = require("child_process").execSync;

function main() {
  console.log(`npm run test-new -- ${process.argv[process.argv.length - 1]}`);
  try {
    execSync(`npm run test-new -- ${process.argv[process.argv.length - 1]}`, {
      stdio: "inherit",
    });
  } catch (error) {
    console.log(error);
  }
}
main();
// execSync("npm run vumper " + arg, { stdio: [0, 1, 2] });
