declare module 'gulp-typescript' {

    export interface createOptions {
        declaration?:boolean;
        target?:string;
        module?:string,
        noImplicitAny?: boolean,
        removeComments?: boolean,
        noLib?: boolean,
        emitDecoratorMetadata?: boolean,
        experimentalDecorators?: boolean,
        noExternalResolve?:boolean,
        sourceMap?: boolean,
        outDir?:string,
        typescript?:any
    }


    export interface  tsProject{
        src():any;
    }


    export function createProject(options:createOptions):tsProject;

    export function createProject(tsPath:string,options:createOptions):tsProject;

    export default function run(proj:tsProject);

}
