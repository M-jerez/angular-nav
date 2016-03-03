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
			var css = path.join(PATH.src,"**/*"+path.extname(CSS.src));
			var ts = path.join(PATH.src,"**/*.ts");
			var index =  INJECT.htmlSrc;
			var others = [path.join(PATH.src,"**"),`!${css}`,`!${ts}`,`${index}`];
			var all = path.join(PATH.src,"**");
			gulp.watch(index,['inject']);
			gulp.watch(ts,['ts_compile',"copy"]);
			gulp.watch(css,['css',"copy"]);
			gulp.watch(others,["copy"]);


			//this is a hack couse liverelad wasnt working.
			gulp.watch(all,()=>{
				return gulp.src("").pipe(plugins.livereload());
			});





			//live reload
			plugins.livereload.listen();
			//var livereload = require('livereload');
			//var server = livereload.createServer();
			//console.log(__dirname+"/"+PATH.src);
			//server.watch(__dirname+"/"+PATH.src);
			gutil.log( gutil.colors.green("Starting liveReload server"));
			gutil.log( gutil.colors.green("Waiting for file changes ..."));


			//open browser
			var url = path.join(PATH.baseUrl,INJECT.dest);
			gutil.log( gutil.colors.green("Open project ", url));
			open(url);

		})
	}

}


export = function clean(gulp:Gulp, plugins) {
	return new watchTask().register(gulp, plugins);
}
