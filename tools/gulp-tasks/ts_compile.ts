import {join} from 'path';
import {TS} from '../../Config';
import * as ts from 'gulp-typescript';


let tsProject =  ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

export = function ts_compile(gulp, plugins) {
    return function () {

        let src = TS.src;
        let result = gulp.src(src)
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.typescript(tsProject));

        return result.js
            .pipe(plugins.sourcemaps.write("maps"))
            .pipe(gulp.dest(TS.dest));
    };
};

