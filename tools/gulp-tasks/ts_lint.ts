import {join} from 'path';
import {PATH,TS} from '../../Config';
var stylish = require('gulp-tslint-stylish');
import {Gulp} from 'gulp';
import {gulpTask} from '../utils';



class tsLintTask implements gulpTask{

	name:string="ts_lint";

	register(gulp:Gulp, plugins) {
		gulp.task(this.name,()=>{
			return gulp.src(TS.src)
				.pipe(plugins.tslint())
				.pipe(plugins.tslint.report(stylish, {
					emitError: false,
					sort: true,
					bell: true
				}));
		});
	}

}

export = function clean(gulp:Gulp, plugins) {
	return new tsLintTask().register(gulp, plugins);
}
