import {join} from 'path';
import {PATH} from '../../Config';

var webpack = require('webpack-stream');



export = function ts_compile(gulp, plugins) {
	return function () {


		return gulp.src([join(PATH.build,"app.js")])
			.pipe(plugins.plumber())
			.pipe(webpack({
				devtool: 'source-map',
				output:{
					sourceMapFilename:"maps/pack.js.map"
				}
			}))

			.pipe(gulp.dest(PATH.build));
	};
};
