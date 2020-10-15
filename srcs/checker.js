const exec = require('util').promisify(require('child_process').exec);
require('dotenv').config();
const { VALGRIND, EXEC, GREP, GREP2} = process.env;
const { printTitle, printRed, printGreen, printBasic } = require('./utility');
const { parserCount, leaksCount } = require('./report');
const progressBar = require('./progressBar');

const makeHeader = (file, maps, index) => {
	printTitle(file);
	progressBar.start(maps.length, index + 1);
	printBasic("\n");
}

const checkParser = async file => {
	const { stdout } = await exec(EXEC+file);
	if (stdout.length && stdout.includes("Error\n")) {
		printBasic(stdout, '\n');
		printGreen("[OK]", "PARSER : ");
		parserCount.passed++;
	}
	else {
		printBasic("\n");
		printRed("[FAILED]", "PARSER : ",
			(stdout.includes("Error\n") ? "" : " ⚠️ Your error message doesn't includes Error\\n ⚠️"));
		printBasic("[n/a]","LEAKS  :")
		parserCount.failed++;
		parserCount.maps.push(file);
	}
}

const checkLeaks = async file => {
	if (!parserCount.maps.includes(file)) {
		await exec(`${VALGRIND} --log-file=logs/LOG_${file} ${EXEC + file}`);
		try {
			const { stdout } = await exec(`${GREP} logs/LOG_${file} ${GREP2}`);
			if (stdout) {
				printBasic(stdout);
				printRed("[FAILED]", "LEAKS  : ");
				leaksCount.failed++;
				leaksCount.maps.push(file);
			}
		} catch (err) {
			printGreen("[OK]", "LEAKS  : ");
			leaksCount.passed++;
			exec(`rm ./logs/LOG_${file}`);
		}
	}
}

module.exports = {
	makeHeader,
	checkParser,
	checkLeaks
}
