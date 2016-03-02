export const PATH = {
    tools : `tools`,
    src : `src`,
    typings : `typings`,
    build :'dist',
    tasks : `tools/gulp-tasks`
};


export enum  css_preprocessor {less, sass}

export const CSS = {
    src : PATH.src+"/main.scss",
    dest : PATH.build,
    preprocessor: css_preprocessor.sass
};


export const TS = {
    src : [
        'typings/browser.d.ts',
        'tools/manual-typings/**/*.d.ts',
        `${PATH.src}/**/*.ts`
    ],
    dest : PATH.build
};

console.log(TS);