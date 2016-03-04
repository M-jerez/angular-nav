/**
 * Created by Ma jerez on 28/02/2016.
 */
import {join} from 'path';
import * as gutil from 'gulp-util';
import {COPY,} from '../../Config';
import {Gulp} from 'gulp';
import {gulpTask} from "../utils";
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');



class copyTask implements gulpTask{

	name:string="brows";

	register(gulp:Gulp, plugins) {

		gulp.task(this.name,()=>{
			var b = browserify({
				entries: 'dist/app.js',
				debug: true
			});

			return b.bundle()
				.pipe(source('dist/app.js'))
				.pipe(buffer())
				.pipe(plugins.sourcemaps.init({loadMaps: true}))
				// Add transformation tasks to the pipeline here.
				.on('error', gutil.log)
				.pipe(plugins.sourcemaps.write('./'))
				.pipe(gulp.dest('dist/assets/js/app2.min.js'));
		});
	}

}

export = function clean(gulp:Gulp, plugins) {
	return new copyTask().register(gulp, plugins);
}
