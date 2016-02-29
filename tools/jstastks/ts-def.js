/**
 * Created by Ma jerez on 20/06/2015.
 */
'use strict';

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */

function string_src(filename, string) {
    var src = require('stream').Readable({ objectMode: true })
    src._read = function () {
        this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
        this.push(null)
    }
    return src
}

module.exports = function (gulp, plugins,conf) {
    return function () {
        var target = gulp.src(conf.output);
        var sources = gulp.src([conf.input], {read: false});
        target
            .pipe(plugins.inject(sources, {
                starttag: '//{',
                endtag: '//}',
                transform: function (filepath) {
                    return '/// <reference path="../..' + filepath + '" />';
                }
            }))
            .pipe(gulp.dest(conf.defDest));
    };
};
