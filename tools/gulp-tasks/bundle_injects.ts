import {PATH,INJECT} from '../../Config';
import * as path from 'path';
import {Gulp} from 'gulp';
import {gulpTask,BundleGroup,resolveInjectPaths} from "../utils";
import * as Builder from 'systemjs-builder';

var merge = require('merge-stream');





class bundleTask implements gulpTask{
    name:string = "bundle_injects";

    files = {};

    register(gulp:Gulp, plugins) {
        gulp.task(this.name, ()=> {

            //read config file & init gulp stream
            var groups:BundleGroup[] = INJECT.injects;
            var streams:any[]=[];

            // process al injects
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                //resolvePtah just once
                if (typeof this.files[group.name] == "undefined") {
                    this.files[group.name] = resolveInjectPaths(group);
                }
                var files = this.files[group.name];
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
        var fname = path.basename(dest);
        var fpath = path.dirname(dest);
        return gulp.src(files)
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.uglify({mangle: false})) //angularjs doesn't allow minification because dependency injection
            .pipe(plugins.concat(fname))
            .pipe(plugins.sourcemaps.write("maps"))
            .pipe(gulp.dest(fpath));
    }

    static bundleCssStream(gulp:Gulp,plugins,files:string[],dest){
        var fname = path.basename(dest);
        var fpath = path.dirname(dest);
        return gulp.src(files)
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(plugins.cssnano(fname))
            .pipe(plugins.sourcemaps.write("maps"))
            .pipe(gulp.dest(fpath));
    }

}

export = function clean(gulp:Gulp, plugins) {
    return new bundleTask().register(gulp, plugins);
}
