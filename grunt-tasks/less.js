'use strict';
var path = require('path');
var conf = require("../tasks-config.js").less;

module.exports = function less(grunt) {
    // Load task and build config
    grunt.loadNpmTasks('grunt-contrib-less');
    // Options
    return {
        build: {
            options:{
                sourceMap:true,
                outputSourceFiles:true,
                sourceMapFilename:path.join(conf.output,conf.maps,"style.css.map"),
                //plugins: [
                //    //new (require('less-plugin-autoprefix'))({browsers: ['last 4 versions', "ie 8", 'ie 9']}),
                //    //new (require('less-plugin-clean-css'))({})
                //    // less clean css plugin is causing problems with sourcemaps,
                //],
            },
            files: [
                {
                    dest:path.join(conf.output,"style.css"),
                    src: conf.input
                }
            ]
        }
    };
};
