import * as path from 'path';
import * as gutil from 'gulp-util';
import {CSS,PATH,INJECT} from '../../Config';
import {Gulp} from 'gulp';
import {gulpTask, css_preprocessor} from '../utils';

var open = require("open");


class watchTask implements gulpTask{

	name:string="watch";

	register(gulp:Gulp, plugins) {
		gulp.task("watch",(done)=>{

			//watch settings
			gulp.watch(path.join(PATH.src,"**"),['copy']);
			gulp.watch(path.join(PATH.src,"**/*.ts"),['ts_compile']);
			gulp.watch(path.join(PATH.src,"**/*"+path.extname(CSS.src)),['css']);

			//open browser
			gutil.log( gutil.colors.blue("Starting liveReload server"));

			//live reload
			var livereload = require('livereload');
			var server = livereload.createServer();
			open(path.join(PATH.baseUrl,INJECT.dest));
			gutil.log( gutil.colors.green("Waiting for file changes"));
			server.watch(path.join(__dirname ,PATH.build));
		})
	}

}


export = function clean(gulp:Gulp, plugins) {
	return new watchTask().register(gulp, plugins);
}
