'use strict';
var path = require('path');
var conf = require("../tasks-config.js").less;


module.exports = function autoprefixer(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Options
    return{
        options: {
            browsers: ['last 4 versions', "ie 8", 'ie 9'],
            cascade:true,
            //map:{
            //    prev:path.join(conf.output,conf.maps,"style.css.map"),
            //    inline:false,
            //    sourcesContent:true,
            //    annotation:"./style.css.map"
            //},
            map:false
        },
        build: {
            dest:path.join(conf.output,"style.css"),
            src: path.join(conf.output,"style.css")
        }
    };
};
