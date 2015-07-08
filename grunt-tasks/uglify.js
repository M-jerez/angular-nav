'use strict';
var path = require('path');
var conf = require("../tasks-config.js").ts;
var jsLibs = require("../tasks-config.js").jsLibs;

module.exports = function uglify(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Options
	return {
		options: {
			sourceMap: true,
			sourceMapIncludeSources: false
		},
        dependencies: {
			dest: path.join(jsLibs.output, 'libs.js'),
			src: path.join(jsLibs.output, "libs.js")
		},
		app_js: {
			dest: path.join(conf.output, 'app.js'),
			src: path.join(conf.output, 'app.js')
		}
	};
};
