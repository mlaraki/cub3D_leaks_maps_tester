const cliProgress = require('cli-progress');

const progressBar = new cliProgress.SingleBar({
	format: '\n \033[33m {bar} \033[0m| {percentage}% | {value}/{total} Tests\n'
}, cliProgress.Presets.shades_classic);

module.exports = progressBar;
