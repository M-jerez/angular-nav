/**
 * Compile, autoprefix an minify less files and creates and external sourcemap.
 */
module.exports = function (gulp, plugins,conf) {
    return function () {
        gulp.src(conf.input)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less())
            .pipe(plugins.autoprefixer())
            .pipe(plugins.minifyCss())
            .pipe(plugins.sourcemaps.write(conf.maps))
            .pipe(gulp.dest(conf.output));
    };
};