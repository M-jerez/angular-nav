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
