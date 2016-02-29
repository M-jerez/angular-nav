import * as gulp from 'gulp';
import * as runInSequence from 'run-sequence';
import * as loadPlugins from 'gulp-load-plugins';
import * as path from "path";
import * as fs from "fs";
import * as gutil from "gulp-util";
import {PATH} from './Config';


//require

autoLoadTasks();

gulp.task("build",done=>{
    runInSequence(
        'clean',
        'copy_dev',
        ['less','ts_compile'],
        done
    )
});


function task(name:string){
    var task = path.join(PATH.tasks,name);
    gutil.log( gutil.colors.green("Loading Task:" ,name));
    return require(path.resolve(task))(gulp,loadPlugins());
}

/**
 * Automatically load all tasks on the tools/gulp-tasks folder with ts extension.
 * if filename = clean.ts then task name = clean
 *
 * Once task has been Autoload, this takss can be used normaly by other gulp tasks
 * ie: gulp.task("build",["autoaloaded_name_1","autoloaded_name_2"....]
 *
 */
function autoLoadTasks(){
    var files = fs.readdirSync(PATH.tasks);
    for (var i in files){
        let name = files[i];
        let file = path.resolve(path.join( PATH.tasks ,name ));
        if (!fs.statSync(file).isDirectory() && path.extname(name) == ".ts"){
            // Not directory and only typescript files
            let task_name = path.basename(name, ".ts");
            gulp.task(task_name,done=>task(task_name)(done));
        }
    }
}