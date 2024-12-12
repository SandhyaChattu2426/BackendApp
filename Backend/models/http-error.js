class HttpError extends Error{
    constructor(message,errorCode){
        super(message);//Add Message
        this.code=errorCode// assigning error code
    }
}
module.exports= HttpError