/**
 * Created by Ma jerez on 29/06/2015.
 */
'use strict';
var path = require('path');
var conf = require("../tasks-config.js").less;

module.exports = function less(grunt) {
    // Load task and build config
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Options
    return {
        build: {
            options: {
                sourceMap: false
            },
            files: [
                {
                    dest:path.join(conf.output,"style.css"),
                    src: path.join(conf.output,"style.css")
                }
            ]
        }
    };
};