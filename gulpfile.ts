import * as gulp from 'gulp';
import * as runInSequence from 'run-sequence';
import * as loadPlugins from 'gulp-load-plugins';
import * as path from "path";
import * as fs from "fs";
import * as gutil from "gulp-util";
import * as del from 'del';
import {PATH,CSS} from './Config';


//require

autoLoadTasks();

gulp.task("build",done=>{
    runInSequence(
        'clean',
        'copy',
        ['css','ts_compile'],
        "watch"
    )
});


gulp.task("watch",done=>{



    gutil.log( gutil.colors.green("Waiting for file changes"));
    gulp.watch(path.join(PATH.src,"**"),['copy']);
    gulp.watch(path.join(PATH.src,"**/*.ts"),['ts_compile']);
    gulp.watch(path.join(PATH.src,"**/*"+path.extname(CSS.src)),['css']);

    gutil.log( gutil.colors.blue("Starting liveReload server"));
    var livereload = require('livereload');
    var server = livereload.createServer();

    console.log(path.join(__dirname ,PATH.build))
    server.watch(path.join(__dirname ,PATH.build));
});

gulp.task("clean",done=>{
    del(PATH.build).then((paths) => {
        gutil.log('Deleting: ', paths.join(' '));
        done();
    });
});



function task(name){
    var task = path.join(PATH.tasks,name);
    gutil.log( gutil.colors.green("Executing Task:" ,name));
    return require(path.resolve(task))(gulp,loadPlugins());
}

/**
 * Automatically load all tasks on the tools/gulp-tasks folder with ts extension.
 * if filename = clean.ts then task name = clean
 *
 * Once task has been Autoload, this taks can be used normally by other gulp tasks
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
            gulp.task(task_name,()=>task(task_name)());
        }
    }
}
