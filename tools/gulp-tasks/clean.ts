/**
 * Created by Ma jerez on 28/02/2016.
 */
import * as del from 'del';
import {PATH} from '../../Config';
import * as gutil from "gulp-util";
import {Gulp} from 'gulp';
import {gulpTask} from '../utils';


class cleanTask implements gulpTask{
	name:string="clean";
	register(gulp:Gulp, plugins) {
		gulp.task(this.name,done=>{
			del(PATH.build).then((paths) => {
				gutil.log('Deleting: ', paths.join(' '));
				done();
			});
		});
	}
}

export = function clean(gulp:Gulp, plugins) {
	return new cleanTask().register(gulp, plugins);
}

