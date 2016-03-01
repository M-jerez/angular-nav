export const PATH = {
    tools : `tools`,
    src : `src`,
    typings : `typings`,
    build :'.dist',
    tasks : `tools/gulp-tasks`
};


export const LESS = {
    src : PATH.build+"/main.less",
    dest : PATH.build
};



export const SASS = {
    src : PATH.build+"/main.scss",
    dest : PATH.build
};



export const INJECT_JS = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/Materialize/dist/js/materialize.js",
    "node_modules/systemjs/dist/system-polyfills.src.js",
    "node_modules/es6-shim/es6-shim.js",
    "node_modules/reflect-metadata/Reflect.js",
    "node_modules/systemjs/dist/system.j"
];