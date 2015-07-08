/**
 * Created by Ma jerez on 06/07/2015.
 */
var path = require('path');
var conf = require("../tasks-config.js").ngViews;

module.exports = function ngtemplates(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-angular-templates');

    // Options
    return {
        templates: {
            dest: path.join(conf.output,"views.js"),
            src: conf.input
        }
    };
};