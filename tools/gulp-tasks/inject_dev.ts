import * as path from 'path';
import {INJECT,PATH} from '../../Config';
import * as gutil from 'gulp-util';
import {GulpPlugin,Gulp} from 'gulp';
import {gulpTask, css_preprocessor,InjectGroup} from "../utils";
import * as fsx from 'fs-extra';
var compilaionID:number = null;


class injectTask implements gulpTask {

	name:string = "inject";


	register(gulp:Gulp, plugins) {
		gulp.task(this.name, ()=> {
			compilaionID = Date.now();
			var groups:InjectGroup[] = INJECT.injects;
			var stream = gulp.src(INJECT.htmlSrc).pipe(plugins.plumber());


			for (var i = 0; i < groups.length; i++) {
				var group = groups[i];
				var files = this.copy(group);
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
			gutil.log("gulp-inject:",gutil.colors.red(`extension '${ext}' not supported, ${rel_root}`));
			return "";
		}
	}


	/**
	 * Copy files
	 * @param injGroup
	 * @param id
	 * @returns {string[]} an array with the file names to use with inject
	 */
	private copy(injGroup:InjectGroup):string[] {
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






