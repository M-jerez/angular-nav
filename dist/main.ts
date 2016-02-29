import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';



class Log{
    text:string = null;
    constructor(text:string){
        this.text = text;
        console.log(this.text);
    }
}

new Log("hello world");