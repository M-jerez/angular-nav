/** Paths config. */
export const PATH = {
	tools: "tools",
	src: "src",
	typings: "typings",
	build: "dist",
	assets: "dist/assets",
	tasks: "tools/gulp-tasks",
	www:"/Applications/AMPPS/www/"
};



import {css_preprocessor} from "./tools/utils";
/** CSS compilation config. */
export const CSS = {
	src: `${PATH.src}/main.scss`,
	dest: PATH.build,
	preprocessor: css_preprocessor.sass
};


/** Typescript compilation config. */
export const TS = {
	src: [
		"typings/browser.d.ts",
		"tools/manual-typings/**/*.d.ts",
		`${PATH.src}/**/*.ts`
	],
	dest: PATH.build
};

/**
 * (CSS and JAVASCRIPT LIBRARIES) injected into index.html page (Only for development)
 * if the "copy" field is set to apath files will be copied to that path on the build directory
 */
export const INJECT_DEV = {
	src: `${PATH.src}/index.html`,
	dest: `${PATH.build}`,
	CSS_HEADER:{
		copy: null,
		src : [
			`${CSS.dest}/main.css`
		]
	} ,
	JS_HEADER:{
		copy: `${PATH.assets}/js`,
		src:[

			"bower_components/jquery/dist/jquery.js",
			"bower_components/Materialize/dist/js/materialize.js",
		]
	} ,
	JS_BODY: {
		copy:`${PATH.assets}/js`,
		src:[
			//es6 and angular shims
			"node_modules/es6-shim/es6-shim.js",
			"node_modules/systemjs/dist/system-polyfills.src.js",
			"node_modules/reflect-metadata/Reflect.js",
			"node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
			//module loader
			"node_modules/systemjs/dist/system.src.js",
			"node_modules/rxjs/bundles/Rx.js"
		]
	}
};



/** List of file copied for build process **/
export const COPY = {
	src :[`${PATH.src}/**`,`!${INJECT_DEV.src}`],
	dest : PATH.build
};


