/**
 * Created by Ma jerez on 08/07/2015.
 */
//cleans compilation directory
module.exports = function (gulp, plugins,conf) {
    return function () {
        gulp.src(conf.input, {read: false})
            .pipe(plugins.clean());
    };
};
