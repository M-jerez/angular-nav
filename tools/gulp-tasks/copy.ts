/**
 * Created by Ma jerez on 28/02/2016.
 */
import {join} from 'path';
import * as gutil from 'gulp-util';
import {COPY} from '../../Config';
import {Gulp} from 'gulp';
import {gulpTask} from "../utils";



class copyTask implements gulpTask{

	name:string="copy";

	register(gulp:Gulp, plugins) {

		gulp.task(this.name,()=>{
			return gulp.src(COPY.src)
				.pipe(plugins.newer(COPY.dest))
				.pipe(gulp.dest(COPY.dest));
		});
	}

}

export = function clean(gulp:Gulp, plugins) {
	return new copyTask().register(gulp, plugins);
}
