
const path = require('path');

module.exports = {
    entry: {
		linechart: "./src/linechart.js",
		rardar: "./src/radar.js",
		barchart: "./src/barchart.js",
		distributionchart: "./src/distribution.js",
	},
    output: {
        path    : path.resolve(__dirname, 'demo/lib'),
        filename: "[name].js",
        libraryTarget: 'umd'
    },
    mode: "none",
    amd: {
        miniappcharts: true
    }
};

