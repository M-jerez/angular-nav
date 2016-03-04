import {PATH,INJECT} from '../../Config';
import * as path from 'path';
import * as gutil from 'gulp-util';
import {Gulp} from 'gulp';
import {gulpTask,BundleGroup,resolveInjectPaths} from "../utils";
import * as Builder from 'systemjs-builder';
import * as fsx from 'fs-extra';

var merge = require('merge-stream');





class bundleTask implements gulpTask{
    name:string = "bundle_injects";

    newFiles = {};

    register(gulp:Gulp, plugins) {
        gulp.task(this.name, ()=> {

            //read config file & init gulp stream
            var groups:BundleGroup[] = INJECT.injects;
            var streams:any[]=[];

            // process al injects
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                //resolvePtah just once
                if (typeof this.newFiles[group.name] == "undefined") {
                    this.newFiles[group.name] = resolveInjectPaths(group);
					bundleTask.copy(group.files, this.newFiles[group.name]);
                }
                var files = this.newFiles[group.name];
                streams.push(bundleTask.bundleStream(gulp,plugins,files,group.min));
            }
            return merge(streams);
        });
    }

    static bundleStream(gulp:Gulp,plugins,files:string[],dest){
        var ext = path.extname(dest);
        if(ext == ".js"){
            return bundleTask.bundleJsStream(gulp,plugins,files,dest);
        }else if(ext = ".css"){
            return bundleTask.bundleCssStream(gulp,plugins,files,dest);
        }else{
            return null;
        }
    }

    static bundleJsStream(gulp:Gulp,plugins,files:string[],dest){
		gutil.log("Concat + Uglify "+files.length+" js files.");
        var fname = path.basename(dest);
        var fpath = path.dirname(dest);
        return gulp.src(files)
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.uglify({mangle: true})) //angularjs doesn't allow minification because dependency injection
            .pipe(plugins.concatUtil(fname,{
				process: function(src, filePath){
					var name = path.basename(filePath);
					return "// ################# Filename: "+name+" ###############\n"+src;
				}

			}))
            .pipe(plugins.sourcemaps.write("maps"))
            .pipe(gulp.dest(fpath));
    }

    static bundleCssStream(gulp:Gulp,plugins,files:string[],dest){
		gutil.log("Minify "+files.length+" css files.");
        var fname = path.basename(dest);
        var fpath = path.dirname(dest);
        return gulp.src(files)
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(plugins.cssnano())
			.pipe(plugins.rename(fname))
            .pipe(plugins.sourcemaps.write("maps"))
            .pipe(gulp.dest(fpath));
    }



	/**
	 * Copy inject files.
	 * @param files
	 * @param newFiles
	 */
	private static copy(files:string[], newFiles:string[]) {
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var newFile = newFiles[i];
			if (file != newFile) {
				try {
					fsx.copySync(file, newFile);
				} catch (e) {
					console.log("Error injecting file:", gutil.colors.red(e));
				}
			}
		}
	}

}

export = function clean(gulp:Gulp, plugins) {
    return new bundleTask().register(gulp, plugins);
}
