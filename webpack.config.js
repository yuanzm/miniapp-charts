
const path = require('path');

module.exports = {
    entry: {
		index: "./index.js",
	},
    output: {
        path    : path.resolve(__dirname, 'examples/libs'),
        filename: "[name].js",
    },
    mode: "production"
};

