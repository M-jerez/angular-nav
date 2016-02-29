import {join} from 'path';
import * as gutil from 'gulp-util';
import {SASS,PATH} from '../../Config';

export = function less(gulp, plugins) {
    return function () {
        gutil.log("Compiling less: ", SASS.src)
        gulp.src(SASS.src)
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(plugins.autoprefixer())
            .pipe(plugins.minifyCss())
            .pipe(plugins.sourcemaps.write("maps"))
            .pipe(gulp.dest(SASS.dest));
    };
};