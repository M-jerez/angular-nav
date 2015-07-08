# Grunt vs Gulp!
This is a simple typescript project based on [DanWahlin/AngularIn20TypeScript](https://github.com/DanWahlin/AngularIn20TypeScript)

The objective is to **Test the use of [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/)** to generate and compile the assets required by a typical  Angular-Typescript project.

---------------------------------

### Notes:
 -  Both tasks manager generate the same assets.
 - For maintainability purposes each task is on it's own file. We will use plugins that automatically load tasks on a specific directory.   [grunt-config-dir](https://www.npmjs.com/package/grunt-config-dir) & [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)
 -  Generated  css files:
	 - **style.css** => Using Less preprocesor, Autoprefixer and css minification.
 - Generated  javascripts files: 
	 - **libs.js** => required libraries and dependencies for the app. 
	 - **app.js** => the Angular application, compiled from typescript.
	 - **views.js** => all angulart templates compiled in to a single file using.  
