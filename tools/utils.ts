/**
 * Created by marlon.jerez on 02/03/2016.
 */
import {GulpPlugin,Gulp} from 'gulp';

/** List of css preprocessors supported by the css compile task. */
export enum  css_preprocessor {less, sass}



/** Object implementing this interface are in charge to register a gulp task  */
export interface gulpTask{

	/**
	 * The Task Name
	 */
	name:string,

	/**
	 * Regiter the gulp task withing this function
	 * @param gulp
	 * @param plugins
     */
	register(gulp:Gulp,plugins);
}

export interface InjectGroup {

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
	injects:InjectGroup[];
}

