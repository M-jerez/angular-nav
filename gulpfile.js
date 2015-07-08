"use strict";

var gulp = require("gulp"),
    del = require("del"),
    plugins = require("gulp-load-plugins")(),
    conf = require("./tasks-config.js");

//default task
gulp.task("default", ["clean","less","ts-def","ts-compile","js-libs","ng-views","watch"]);

//tasks
gulp.task("less", task("less",conf.less));
gulp.task("ts-def",task("ts-def",conf.tsDef));
gulp.task("ts-compile",task("ts-compile",conf.ts));
gulp.task("js-libs", task("js-libs",conf.jsLibs));
gulp.task("ng-views", task("angular-views",conf.ngViews));
gulp.task("clean", function (cb) {
    del("./public/compiled/", cb);
});

//watchers
gulp.task("watch-less", function() {gulp.watch([conf.less.input], ["ts"]);});
gulp.task("watch-ts", function() {gulp.watch([conf.ts.input[0]], ["ts-def","ts-compile"]);});
gulp.task("watch-js-libs", function() {gulp.watch(conf.jsLibs.input, ["js-libs"]);});
gulp.task("watch-ng-views", function() {gulp.watch([conf.ngViews.input], ["angular-views"]);});
gulp.task("watch",["watch-less","watch-ts","watch-js-libs","watch-ng-views"]);



function task(task,taskConf) {
    return require("./gulp-tasks/" + task)(gulp, plugins,taskConf);
}




