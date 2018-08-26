class MyError {
    constructor(id, msg, errtype = "default") {
        this.id = id
        this.msg = msg
        this.errtype = errtype
    }
    toString() {
        return `[${this.errtype} error] errorId:${this.id} errorMsg:${this.msg}`
    }
}
class ArgsError extends MyError {
    constructor(msg) {
        super(1001, msg, "invalid args")
    }
}

class IntenalError extends MyError{
    constructor(msg){
        super(1002,msg,"inner")
    }
}
module.exports={
    ArgsError,
    IntenalError
}
// exports.ArgsError = ArgsError
// exports.IntenalError = IntenalError