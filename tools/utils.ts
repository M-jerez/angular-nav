/**
 * Created by marlon.jerez on 02/03/2016.
 */
import {GulpPlugin,Gulp} from 'gulp';
import * as path from 'path';

/** List of css preprocessors supported by the css compile task. */
export enum  css_preprocessor {less, sass}


/** Object implementing this interface are in charge to register a gulp task  */
export interface gulpTask {

    /**
     * The Task Name
     */
    name:string,

    /**
     * Regiter the gulp task withing this function
     * @param gulp
     * @param plugins
     */
    register(gulp:Gulp, plugins);
}

export interface BundleGroup {

    /**
     * Destination path of the copied files
     */
    copy?:string;
    /**
     * Set to true if want faltten file path when copied.
     * (Only used on copied files)
     */
    flatten?:boolean;

    /**
     * List of files to inject
     */
    files:string[];

    /**
     * Name of the inject annotation
     */
    injectName:string;


    /**
     * The Name or identifier od the inject group
     */
    name:string;


    /**
     * The destination file for  concatenation  and minification
     * The extension of this file will indicate if it is bundled as css or javascript
     */
    min?:string;



}

export interface HtmlInject {
    /**
     * The src Html with the inject annotations
     */
    htmlSrc:string;

    /**
     * The dstination directory
     */
    dest:string;


    /**
     * Groups of files to inject
     */
    inject_groups:BundleGroup[];
}

/**
 * Returns the new paths for files to be injected depending if the file needs to be copied and flattened.
 * @param injGroup
 * @constructor
 */
export function resolveInjectPaths(injGroup:BundleGroup):string[] {
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
    }
    return results;
}

