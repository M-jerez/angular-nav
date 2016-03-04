import * as path from 'path';
import {INJECT,PATH,SYSTEM_JS,TS} from '../../Config';
import * as gutil from 'gulp-util';
import {GulpPlugin,Gulp} from 'gulp';
import {gulpTask, css_preprocessor,BundleGroup,resolveInjectPaths} from "../utils";
import * as fsx from 'fs-extra';
var merge = require('merge-stream');

var compilationID:number = null;
var Inject:any = null;
var systemJsAlreadyInjected = false;

class injectTask implements gulpTask {

    name:string = "inject_prod";



    register(gulp:Gulp, plugins) {
        gulp.task(this.name, ()=> {
            //required values for the transform function
            compilationID = Date.now();
            Inject = plugins.inject;

            //read config file & init gulp stream
            var groups:BundleGroup[] = INJECT.injects;
            var stream = gulp.src(INJECT.htmlSrc).pipe(plugins.plumber());

            // process al injects
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];

                //stores the result of copy on the files object so copy is not performed on watch task
                stream.pipe(plugins.inject(gulp.src(group.min, {read: false}), {
                    name: group.injectName,
                    transform: injectTask.addCompilationTime
                }));
            }

            //inject the budled app with systemjs
            stream.pipe(plugins.inject(gulp.src(TS.min, {read: false}), {
                name: SYSTEM_JS.injectName,
                transform: injectTask.injectSystemjs
            }));

            //return stream
            return stream.pipe(gulp.dest(INJECT.dest));
        });
        return this;
    }


    /**
     * Add a compilation identifiar to the generated url so new files are never cached
     * @param filepath
     * @returns {any}
     */
    static addCompilationTime(filepath) {
        // creates the path relative to the destination file
        var rel_root = path.join(".", filepath);
        var rel_dest = path.relative(INJECT.dest, rel_root);
        var ext = path.extname(filepath);
        if (ext == ".css") {
            return `<link rel="stylesheet" href="${rel_dest}?${compilationID}">`
        } else if (ext == ".js") {
            return `<script src="${rel_dest}?${compilationID}"></script>`
        } else {
            // Use the default transform as fallback:
            return Inject.transform.apply(Inject.transform, arguments);
        }
    }


    /**
     * Copy inject files.
     * @param files
     * @param newFiles
     */
    private static copy(files:string[], newFiles:string[]) {
        gutil.log("Copying files for inject");
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


    private static injectSystemjs(filepath) {
		var rel_root = path.join(".", filepath);
		var rel_dest = path.relative(INJECT.dest, rel_root);
		return `<script src="${rel_dest}?${compilationID}"></script>`
    }

}

//singleton
export = function clean(gulp:Gulp, plugins) {
    return new injectTask().register(gulp, plugins);
}







