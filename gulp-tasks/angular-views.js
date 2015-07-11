/**
 * Created by Ma jerez on 21/06/2015.
 */

//compiles angular templates
module.exports = function (gulp, plugins,conf) {
    return function () {
        gulp.src(conf.input)
            .pipe(plugins.angularTemplatecache({
                filename:conf.outputName,
                standalone:true
            }))
            .pipe(gulp.dest(conf.output))
            .pipe(plugins.gzip())
            .pipe(gulp.dest(conf.output));
    };
};
