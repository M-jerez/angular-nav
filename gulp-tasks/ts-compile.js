/**
 * Created by Ma jerez on 20/06/2015.
 */

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
module.exports = function (gulp, plugins,conf) {
    return function () {
        var sourceTsFiles = conf.input;
        var tsResult = gulp.src(sourceTsFiles)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.typescript({
                target: 'ES5',
                sortOutput: true,
                declarationFiles: false,
                noExternalResolve: true
            }));
        tsResult.js
            .pipe(plugins.concat("app.js"))
            //mangle false avoids bug with string based dependency injection in angular
            //.pipe(plugins.uglify({mangle:false}))
            .pipe(plugins.sourcemaps.write(conf.maps))
            .pipe(gulp.dest(conf.output));
    };
};
