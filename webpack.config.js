
const path = require('path');

module.exports = {
    entry: {
		index: "./src/index.js",
		radar: "./src/radar.js",
        main : "./src/main.js",
	},
    output: {
        path    : path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    mode: "development",
};

