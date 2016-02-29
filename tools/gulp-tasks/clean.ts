import * as gutil from 'gulp-util'
import * as del from 'del';
import {PATH} from '../../Config';

export = function clean(gulp, plugins) {
    return function(done) {
        del(PATH.build).then((paths) => {
            gutil.log('Deleting: ', paths.join(' '));
            done();
        });
    };
};