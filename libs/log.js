class Log{
    constructor(logname){
        this.logname = logname
    }
    info(msg){
        this.output("info",msg)
    }
    error(msg){
        this.output("error",msg)
    }
    output(logtype,msg){
        console.log(`[${this.logname}][${logtype}] ${msg}`)
    }
}


exports.Log=Log