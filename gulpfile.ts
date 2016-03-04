import * as gulp from 'gulp';
import * as runInSequence from 'run-sequence';
import * as loadPlugins from 'gulp-load-plugins';
import * as path from "path";
import * as fs from "fs";
import * as gutil from 'gulp-util';
import {PATH,CSS} from './Config';

//require
autoLoadTasks(PATH.tasks);



gulp.task('default', done=>{
	runInSequence(
		'Build',
		'watch'
	)
});
gulp.task("Build", done=> {
	runInSequence(
		'clean',
		'copy',
		['css', 'ts_compile'],
		"inject_dev",
		done
	)
});


/**
 * Automatically load all tasks on the tools/gulp-tasks folder with ts extension.
 * if filename = clean.ts then task name = clean
 *
 * Once task has been Autoload, this taks can be used normally by other gulp tasks
 * ie: gulp.task("build",["autoaloaded_name_1","autoloaded_name_2"....]
 *
 */
function autoLoadTasks(task_dir) {
	var files = fs.readdirSync(task_dir)
	for (var i in files) {
		let name = files[i];
		let file = path.resolve(path.join(task_dir, name));
		if (!fs.statSync(file).isDirectory() && path.extname(name) == ".ts") {
			// Not directory and only typescript files
			let task_name = path.basename(name, ".ts");
			requiretask(task_dir, task_name);
		}
	}
}


/**
 * Load a task using loadPlugins
 * @param name
 * @returns {any}
 */
function requiretask(task_dir, name) {
	var task = path.join(task_dir, name);
	gutil.log(gutil.colors.green("Require Task:", name));
	return require(path.resolve(task))(gulp, loadPlugins());
}




