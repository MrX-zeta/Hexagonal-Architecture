export class UserCreatedAt{
    value : Date

    constructor(value : Date){
        this.value = value
    }

    private ensureIsValidCreation(){
        if(this.value > new Date){
            throw Error("User Created at must be in the past")
        }
    }
}