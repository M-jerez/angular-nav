"use strict";
/** ##########################################
 *  CONFIGURATION
 * ########################################### **/
var src =  "src/";
var dest = "www/";
var config = {
    //compile less files
    less: {
        src: [src+"**/**.less"],
        dest: dest
    }
};



config.jsLibs = {
    output: "./public/compiled/js/",
    maps: "../maps",
    input: [
        "./bower_components/angular/angular.js",
        "./bower_components/angular-route/angular-route.js",
        "./bower_components/angular-animate/angular-animate.js"
    ]
};


/** ###########################################
 *  GULP TASKS
 *  ########################################### **/

var gulp  = require( 'gulp');
var rimraf  = require( 'rimraf');
var plugins  = require( 'gulp-load-plugins')();



//default task
gulp.task("default", ["clean", "less", "ts-def", "ts-compile", "js-libs", "ng-views", "watch"]);

//tasks
gulp.task("less", callTask("less", config.less));
gulp.task("ts-def", callTask("ts-def", config.tsDef));
gulp.task("ts-compile", callTask("ts-compile", config.ts));
gulp.task("js-libs", callTask("js-libs", config.jsLibs));
gulp.task("clean", function (cb) {
    rimraf.sync("./public/compiled/");
    cb(null);
});

//watchers
gulp.task("watch-less", function () {
    gulp.watch(conf.less.input, ["less"]);
});
gulp.task("watch-ts", function () {
    gulp.watch([conf.ts.input[0]], ["ts-compile"]);
});
gulp.task("watch-js-libs", function () {
    gulp.watch(conf.jsLibs.input, ["js-libs"]);
});
gulp.task("watch-ng-views", function () {
    gulp.watch(conf.ngViews.input, ["angular-views"]);
});
gulp.task("watch", ["watch-less", "watch-ts", "watch-js-libs", "watch-ng-views"]);


function callTask(task) {
    return require("./_tools/gulp-tasks/" + task)(gulp, plugins);
}




