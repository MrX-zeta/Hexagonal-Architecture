export class UserName{
    value: String

    constructor(value:String){
        this.value = value
    }

    private ensureIsValidName(){
        if(this.value.length < 3){
            throw Error("The User's name must me at least 3 characters long")
        }
    }
}