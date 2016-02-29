class Log{
    text:string = null;
    constructor(text:string){
        this.text = text;
        console.log(this.text);
    }
}

new Log("hello world");