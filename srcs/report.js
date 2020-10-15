const { printTitle, printRed, printGreen, printBasic } = require("./utility");

let parserCount = {
  passed: 0,
  failed: 0,
  maps: []
};
let leaksCount = {
  passed: 0,
  failed: 0,
  maps: []
};

const makeReport = () => {

  printTitle("REPORT", "\n\n");
  printBasic(`PARSER : ${parserCount.passed}/${parserCount.passed + parserCount.failed}`);
  printBasic(`LEAKS  : ${leaksCount.passed}/${leaksCount.passed + leaksCount.failed}`);

  for ([index, mapFailed] of parserCount.maps.entries()) {
    if (!index) printBasic(`PARSER FAILED MAP : `, "\n", `\t👉 ${mapFailed}`);
    else printBasic(mapFailed, "\t\t\t👉");
  }

  for ([index, mapFailed] of leaksCount.maps.entries()) {
    if (!index) printBasic(`LEAKS FAILED MAP : `, "\n", `\t👉 ${mapFailed}`);
    else printBasic(mapFailed, "\t\t\t👉");
  }

  if (!parserCount.failed && !leaksCount.failed) printGreen("☺️ NICE JOB ☺️", "\nCONCLUSION : ");
  else printRed("💩 Your cub3D is poop 💩", "\nCONCLUSION : ");
};

module.exports = {
  makeReport,
  parserCount,
  leaksCount,
};
