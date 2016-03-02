import {join} from 'path';
import * as gutil from 'gulp-util';
import {CSS,PATH, css_preprocessor} from '../../Config';

export = function css(gulp, plugins) {
    return function () {
        gutil.log("Compiling css: ", CSS.src)
        var x = gulp.src(CSS.src)
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init());

        if (CSS.preprocessor == css_preprocessor.sass) {
            x.pipe(plugins.sass().on('error',plugins.sass.logError));
        } else if (CSS.preprocessor == css_preprocessor.less) {
            x.pipe(plugins.less());
        }

        x.pipe(plugins.autoprefixer())
            .pipe(plugins.minifyCss())
            .pipe(plugins.sourcemaps.write("maps"))
            .pipe(gulp.dest(CSS.dest));
    };
};