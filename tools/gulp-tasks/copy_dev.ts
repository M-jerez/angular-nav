/**
 * Created by Ma jerez on 28/02/2016.
 */
import {join} from 'path';
import * as gutil from 'gulp-util';
import {PATH} from '../../Config';

export = function copy_dev(gulp, plugins) {
    return function () {
        gutil.log("Copying ",PATH.src+'/**'," Files to:",PATH.build+"/**");
        return gulp.src([join(PATH.src,'**')])
            .pipe(gulp.dest(PATH.build));
    };
}