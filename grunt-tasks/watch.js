'use strict';

var conf = require("../tasks-config.js").less;

module.exports = function watch(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Options
    return {
        css:{
            files: ['**/*.less'],
            tasks: ['css'],
        },
        js:{
            files: ['**/*.ts'],
            tasks: ['js'],
        },
        options: {
            spawn: false
        },
    };
};
