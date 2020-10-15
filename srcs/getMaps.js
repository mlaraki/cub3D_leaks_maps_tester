const fs = require('fs');
const fsPromises = fs.promises;

const getMaps = async () => {
	try {
		let maps = await fsPromises.readdir('./invalid_maps');
		return maps || [];
	} catch (error) {
		console.log(error.message)
		throw new Error("Error occured while reading directory ./invalid maps");
	}
}

module.exports = { getMaps };
