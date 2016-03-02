import * as path from 'path';
import {INJECT_DEV,PATH} from '../../Config';
import * as gutil from 'gulp-util';
import {GulpPlugin,Gulp} from 'gulp';
import {gulpTask, css_preprocessor} from "../utils";
var compilaionID:number =  null;



class injectTask implements gulpTask{

	name:string="inject_dev";

	register(gulp:Gulp, plugins) {
		gulp.task(this.name,()=>{
			compilaionID = Date.now();
			var js_header = gulp.src(INJECT_DEV.JS_HEADER.src);
			js_header.pipe(plugins.filelog());

			var date = Date.now();

			return gulp.src(INJECT_DEV.src)
				.pipe(plugins.plumber())
				.pipe(plugins.inject(gulp.src(INJECT_DEV.CSS_HEADER.src, {read: false}), {
					name: 'inject-head',
					transform: resolvePAth
				}))
				.pipe(plugins.inject(gulp.src(INJECT_DEV.JS_HEADER.src, {read: false}), {
					name: 'inject-body',
					transform: resolvePAth
				}))
				.pipe(plugins.inject(gulp.src(INJECT_DEV.JS_BODY.src, {read: false}), {
					name: 'inject-body',
					transform: resolvePAth
				}))
				.pipe(gulp.dest(INJECT_DEV.dest));
		});
	}

}


function resolvePAth(filepath, file, i, length) {

	var rel_root= path.join(".",filepath);
	var rel_dest = path.relative(INJECT_DEV.dest,rel_root);
	var ext = path.extname(filepath);
	if(ext==".css"){
		return `<link rel="stylesheet" href="${rel_dest}?${compilaionID}">`
	}else if(ext==".js"){
		return `<script src="${rel_dest}?${compilaionID}"></script>`
	}else{
		gutil.log("gulp-inject:",gutil.colors.red(`extension '${ext}' not supported, ${rel_root}`));
		return "";
	}
}


export = function clean(gulp:Gulp, plugins) {
	return new injectTask().register(gulp, plugins);
}






