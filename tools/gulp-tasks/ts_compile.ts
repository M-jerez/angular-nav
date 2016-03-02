import {join} from 'path';
import {TS} from '../../Config';
import * as ts from 'gulp-typescript';
import {gulpTask, css_preprocessor} from "../utils";
import {GulpPlugin,Gulp} from 'gulp';

let tsProject =  ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});



class tsCompileTask implements gulpTask{

	name:string="ts_compile";

	register(gulp:Gulp, plugins) {
		gulp.task(this.name,()=>{
			let src = TS.src;
			let result = gulp.src(src)
				.pipe(plugins.plumber())
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.typescript(tsProject));

			return result.js
				.pipe(plugins.sourcemaps.write("maps"))
				.pipe(gulp.dest(TS.dest));
		});
	}

}

export = function clean(gulp:Gulp, plugins) {
	return new tsCompileTask().register(gulp, plugins);
}



