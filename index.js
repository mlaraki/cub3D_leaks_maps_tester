const exec = require('util').promisify(require('child_process').exec);
const figlet = require('figlet');
const inquirer = require('inquirer');
const { printRed } = require('./srcs/utility');
const { makeReport } = require('./srcs/report');
const progressBar = require('./srcs/progressBar');
const { getMaps } = require('./srcs/getMaps');
const { makeHeader, checkParser, checkLeaks } = require('./srcs/checker');


const init = async () => {
	try {
		await exec('make -C ../');
		await exec('rm -rf logs');
	} catch (error) {
		// this error should not be catched
	} finally {
		await exec('mkdir logs');
	}
}

const check = async (maps, testVariant) => {
	try {
		await init();
		for ([index, file] of maps.entries()) {
			makeHeader(file, maps, index);
			if (testVariant === 'All' || testVariant === 'Parser')
				await checkParser(file);
			if (testVariant === 'All' || testVariant === 'Leaks')
				await checkLeaks(file);
		}
	} catch (error) {
		throw new Error(error);
	}
}

const inquire = async () => {
	try {
		const test = await inquirer.prompt([
			{
				type: 'list',
				name: 'variant',
				message: 'What type of test do you want to run ?',
				choices: ['All', 'Parser', 'Leaks'],
			},
		])
		return test.variant;
	} catch (error) {
		throw new Error(error);
	}
}

(async function main() {
	try {
		const testVariant = await inquire();
		const maps = await getMaps();
		if (!maps.length)
			throw new Error("No maps found");
		await check(maps, testVariant);
		makeReport();
		figlet("mlaraki@42 Paris", (_, data) => console.log(data));
		console.log("\n\n You can add maps by submitting a pull request to :\n https://github.com/mlaraki/cub3D_leaks_maps_tester");
	} catch (err) {
		printRed(err.message);
	} finally {
		setTimeout(() => {
			progressBar.stop();
		}, 1000);
	}
})();
