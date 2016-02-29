import {join} from 'path';
import {PATH} from '../../Config';



export = function ts_compile(gulp, plugins) {
    return function () {
        let tsProject =  plugins.typescript.createProject('tsconfig.json', {
            typescript: require('typescript')
        });;
        let src = [
            'typings/browser.d.ts',
            'tools/manual_typings/**/*.d.ts',
            join(PATH.build, '**/*.ts')
        ];
        let result = gulp.src(src)
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.typescript(tsProject));

        return result.js
            .pipe(plugins.sourcemaps.write("maps"))
            .pipe(gulp.dest("."));
    };
};



export function tsProjectFn(plugins) {
    return
}