/**
 * Created by Ma jerez on 04/03/2016.
 */
import {PATH,INJECT,TS,SYSTEM_JS} from '../../Config';
import * as path from 'path';
import {Gulp} from 'gulp';
import {gulpTask,BundleGroup,resolveInjectPaths} from "../utils";
import * as Builder from 'systemjs-builder';


const BUNDLER_OPTIONS = {
    minify: false,
    mangle: false,
    sourceMaps: true
};

class bundleSysTask implements gulpTask{
    name:string = "bundle_app";

    files = {};

    register(gulp:Gulp, plugins) {
        gulp.task(this.name, (done)=> {
            let builder = new Builder(SYSTEM_JS.config_static);
			var name = path.basename(TS.main,".ts");
            var src = path.join(TS.dest,name+".js");
            var dest = TS.min;
            builder
                .buildStatic(src,dest,BUNDLER_OPTIONS)
                .then(() => done());

        });
    }


}

export = function clean(gulp:Gulp, plugins) {
    return new bundleSysTask().register(gulp, plugins);
}
