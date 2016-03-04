import {css_preprocessor, BundleGroup,HtmlInject} from "./tools/utils";


/** Paths config. */
export const PATH = {
    tools: "tools",
    src: "src",
    typings: "typings",
    build: "dist",
    assets: "dist/assets",
    tasks: "tools/gulp-tasks",
    baseUrl: "http://localhost/mjerez/angular2-seed/"
};


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
    dest: PATH.build,
    min:`${PATH.build}/assets/js/app.min.js`
};

export const SYSTEM_JS = {
    config:{
        "defaultJSExtensions": true,
        "paths": {"main": "/main", "angular2/*": "../node_modules/angular2/*", "rxjs/*": "../node_modules/rxjs/*"}
    },
    config_static:{
        "defaultJSExtensions": true,
        "paths": {"main": "/main", "angular2/*": "./node_modules/angular2/*", "rxjs/*": "./node_modules/rxjs/*"}
    },
    injectName : "inject-app-load"
};





/**
 * (CSS and JAVASCRIPT LIBRARIES) injected into index.html page
 * if the "copy" field is set to apath files will be copied to that path on the build directory
 * This literal implements {HtmlInject} Interface
 */
export const INJECT = {
    htmlSrc: `${PATH.src}/index.html`,
    dest: `${PATH.build}`,
    injects: [
        {
            name: "CSS",
            copy: null,
            injectName: "inject-css-head",
            min: `${CSS.dest}/main.min.css`,
            files: [`${CSS.dest}/assets/css/main.css`]
        },
        {
            name: "JS_HEAD",
            copy: `${PATH.assets}/js`,
            flatten: true,
            injectName: "inject-js-head",
            min: `${PATH.assets}/js/head.min.js`,
            files: [
                "bower_components/jquery/dist/jquery.js",
                "bower_components/Materialize/dist/js/materialize.js",
            ]
        },
        {
            name: "JS_BODY",
            copy: `${PATH.assets}/js`,
            flatten: true,
            injectName: "inject-js-body",
            min: `${PATH.assets}/js/body.min.js`,
            files: [
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

    ]
};


/** List of file copied for build process **/
export const COPY = {
    src: [`${PATH.src}/**`, `!${INJECT.htmlSrc}`],
    dest: PATH.build
};


