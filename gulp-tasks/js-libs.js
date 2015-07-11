/**
 * Created by Ma jerez on 21/06/2015.
 */
/**
 * Automatically concat and uglify javascript libraries
 * @param gulp
 * @param plugins
 * @returns {Function}
 */
module.exports = function (gulp, plugins,conf) {
    return function () {
        gulp.src(conf.input)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat("libs.js"))
            .pipe(plugins.uglify())
            .pipe(plugins.sourcemaps.write(conf.maps))
            .pipe(gulp.dest(conf.output))
            .pipe(plugins.gzip())
            .pipe(gulp.dest(conf.output));
    };
};