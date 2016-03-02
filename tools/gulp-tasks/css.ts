import {join} from 'path';
import * as gutil from 'gulp-util';
import {CSS,PATH} from '../../Config';
import {gulpTask, css_preprocessor} from "../utils";
import {GulpPlugin,Gulp} from 'gulp';



class cssTask implements gulpTask{

	name:string="css";

	register(gulp:Gulp, plugins) {
		gulp.task(this.name,()=>{
			var x = gulp.src(CSS.src)
				.pipe(plugins.plumber())
				.pipe(plugins.sourcemaps.init());

			if (CSS.preprocessor == css_preprocessor.sass) {
				x.pipe(plugins.sass().on('error',plugins.sass.logError));
			} else if (CSS.preprocessor == css_preprocessor.less) {
				x.pipe(plugins.less());
			}

			return x.pipe(plugins.autoprefixer())
				.pipe(plugins.minifyCss())
				.pipe(plugins.sourcemaps.write("maps"))
				.pipe(gulp.dest(CSS.dest));
		});
	}
}


export = function clean(gulp:Gulp, plugins) {
	return new cssTask().register(gulp, plugins);
}
