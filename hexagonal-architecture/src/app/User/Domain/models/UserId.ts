export class UserId{
    value: String

    constructor(value: String){
        this.value = value
    }

    private ensureIsValid(){
        if(this.value.length < 5){
            throw Error("The Id must be at least 5 characters long")
        }
    }
}