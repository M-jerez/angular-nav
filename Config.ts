
export const PATH = {
    tools : `tools`,
    src : `src`,
    typings : `typings`,
    build :'dist',
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