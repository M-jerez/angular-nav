'use strict';
var path = require('path');
var conf = require("../tasks-config.js").ts;

module.exports = function typescript(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-ts');

	// Options
	return {
        options: {
            module: 'commonjs', //node.js module system
            target: 'es5', //or es3
            sourceMap: true,
            mapRoot:"./public/compiled/maps",
            inlineSources:true,
            inlineSourceMap:true,
            declaration: true
        },
        base: {
            src: conf.input,
            out:path.join(conf.output,"app.js")
        }
    };
};
