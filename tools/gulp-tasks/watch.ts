import * as path from 'path';
import * as gutil from 'gulp-util';
import {CSS,PATH} from '../../Config';
import {Gulp} from 'gulp';
import {gulpTask, css_preprocessor} from '../utils';

var open = require("open");


class watchTask implements gulpTask{

	name:string="watch";

	register(gulp:Gulp, plugins) {
		gulp.task("watch",(done)=>{
			gutil.log( gutil.colors.green("Waiting for file changes"));
			gulp.watch(path.join(PATH.src,"**"),['copy']);
			gulp.watch(path.join(PATH.src,"**/*.ts"),['ts_compile']);
			gulp.watch(path.join(PATH.src,"**/*"+path.extname(CSS.src)),['css']);
			gutil.log( gutil.colors.blue("Starting liveReload server"));
			var livereload = require('livereload');
			var server = livereload.createServer();
			server.watch(path.join(__dirname ,PATH.build));
		})
	}

}


function openFileUrl(www_path,project_path,in)


export = function clean(gulp:Gulp, plugins) {
	return new watchTask().register(gulp, plugins);
}
