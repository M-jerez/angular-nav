import * as gulp from 'gulp';
import * as sequence from 'run-sequence';
import * as loadPlugins from 'gulp-load-plugins';
import {PATH} from './Config';
import {join , resolve, extname , basename} from "path";
import * as fs from "fs";
import * as gutil from "gulp-util";


//require

autoLoadTasks();

gulp.task("build",done=>{
    sequence(
        'clean',
        'copy_dev',
        'less',
        done
    )
});


function task(name:string){
    var task = join(PATH.tasks,name);
    gutil.log( gutil.colors.green("Loading Task:" ,name));
    return require(resolve(task))(gulp,loadPlugins());
}


function autoLoadTasks(){
    var files = fs.readdirSync(PATH.tasks);
    for (var i in files){
        let name = files[i];
        let file = resolve(join( PATH.tasks ,name ));
        if (!fs.statSync(file).isDirectory() && extname(name) == ".ts"){
            // Not directory and only typescript files
            let task_name = basename(name, ".ts");
            gulp.task(task_name,done=>task(task_name)(done));
        }
    }
}