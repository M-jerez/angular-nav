'use strict';
var path = require('path');
var conf = require("../tasks-config.js").ts;
var jsLibs = require("../tasks-config.js").jsLibs;

module.exports = function concat(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Options
    return {
        options: {
            separator: ';'
        },
        dependencies: {
            //Dependencies list must be set manually in the config ModuleWorkFlow.js file
            src: jsLibs.input,
            dest: path.join(jsLibs.output,"libs.js")
        },
        //app: {
        //    src: path.join(conf.modules,"app.js"),
        //    dest:path.join(conf.projectFronted,"app.js")
        //}
    };
};
