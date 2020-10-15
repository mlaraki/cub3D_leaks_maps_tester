const printGreen = (str, preprend = "", append = "") => console.log("\033[32m",`${preprend}${str}${append}`,"\033[0m");

const printRed = (str, preprend = "", append = "") => console.log("\033[31m", `${preprend}${str}${append}`, "\033[0m");

const printTitle = (str, preprend = "", append = "") => console.log(`${preprend}----------------- ${str} -----------------${append}`);

const printBasic = (str, preprend = "", append = "") => console.log(` ${preprend} ${str} ${append}`);

module.exports = {
	printGreen,
	printRed,
	printTitle,
	printBasic
}
