export class User {
    firstName:string;
    lastName:string;
    email:string;
    zipCode:string
    created_at:string;
    country:string;
    roles:Array<string>;

    constructor(user:any){
        this.firstName = user.name;
        this.lastName = user.lastName;
        this.email = user.email
        this.zipCode = user.zipCode
        this.created_at = user.created_at;
        this.country = user.country
        this.roles = user.roles;
    }
}
