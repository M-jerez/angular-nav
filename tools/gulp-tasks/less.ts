import {join} from 'path';
import * as gutil from 'gulp-util';
import {LESS,PATH} from '../../Config';

export = function less(gulp, plugins) {
    return function () {
        gutil.log("Compiling less: ", LESS.src)
        gulp.src(LESS.src)
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less())
            .pipe(plugins.autoprefixer())
            .pipe(plugins.minifyCss())
            .pipe(plugins.sourcemaps.write("maps"))
            .pipe(gulp.dest(LESS.dest));
    };
};