import * as path from 'path';
import {INJECT,PATH} from '../../Config';
import * as gutil from 'gulp-util';
import {GulpPlugin,Gulp} from 'gulp';
import {gulpTask, css_preprocessor,InjectGroup} from "../utils";
import * as fsx from 'fs-extra';
var compilaionID:number = null;
var Inject:any=null;

class injectTask implements gulpTask {

	name:string = "inject";

	files={};

	register(gulp:Gulp, plugins) {
		gulp.task(this.name, ()=> {
			//required values for the transform function
			compilaionID = Date.now();
			Inject = plugins.inject;

			//read config file & init gulp stream
			var groups:InjectGroup[] = INJECT.injects;
			var stream = gulp.src(INJECT.htmlSrc).pipe(plugins.plumber());

			// process al injects
			for (var i = 0; i < groups.length; i++) {
				var group = groups[i];

				//stores the result of copy on the files object so copy is not performed on watch task
				if(typeof this.files[group.name] == "undefined"){
					this.files[group.name] = this.copy(group);
				}
				var files = this.files[group.name];
				stream.pipe(plugins.inject(gulp.src(files, {read: false}), {
					name: group.injectName,
					transform: this.addCompilationTime
				}))
			}

			return stream.pipe(gulp.dest(INJECT.dest));
		});
	}





	/**
	 * Add a compilation identifiar to the generated url so new files are never cached
	 * @param filepath
	 * @returns {any}
     */
	addCompilationTime(filepath) {
		// creates the path relative to the destination file
		var rel_root= path.join(".",filepath);
		var rel_dest = path.relative(INJECT.dest,rel_root);
		var ext = path.extname(filepath);
		if(ext==".css"){
			return `<link rel="stylesheet" href="${rel_dest}?${compilaionID}">`
		}else if(ext==".js"){
			return `<script src="${rel_dest}?${compilaionID}"></script>`
		}else{
			// Use the default transform as fallback:
			return Inject.transform.apply(Inject.transform, arguments);
		}
	}


	/**
	 * Copy files
	 * @param injGroup
	 * @param id
	 * @returns {string[]} an array with the file names to use with inject
	 */
	private copy(injGroup:InjectGroup):string[] {
		gutil.log("Copying files for inject");
		var files = injGroup.files;
		var dest = injGroup.copy;
		var flatten = (injGroup.flatten);//return false instead undefiled if flatten is undefined
		var results:string[] = [];
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var newFile = file;
			if (flatten && dest) {
				newFile = path.join(dest, path.basename(file));
			} else if (dest) {
				newFile = path.join(dest, file);
			}
			results[i] = newFile;
			this.copyFile(file, newFile);
		}
		return results;
	}

	/**
	 * Copy a file syncronously
	 * @param file
	 * @param newFile
	 */
	private copyFile(file, newFile) {
		if (file == newFile)
			return;
		try {
			fsx.copySync(file, newFile);
		} catch (e) {
			console.log("Error injecting file:", gutil.colors.red(e));
		}
	}
}



export = function clean(gulp:Gulp, plugins) {
	return new injectTask().register(gulp, plugins);
}






