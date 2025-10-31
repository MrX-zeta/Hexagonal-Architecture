export class UserEmail{
    value : String

    constructor(value:string){
        this.value = value
        this.EnsureIsValidEmail()
    }

    private EnsureIsValidEmail(){
        if(!this.value.includes("@") || !this.value.includes(".")){
            throw Error("User email must be a valid email address")
        }
    }
}