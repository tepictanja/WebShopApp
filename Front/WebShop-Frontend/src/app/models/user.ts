export class User {
    id : number;
    firstName : string;
    lastName : string;
    username : string;
    email : string;
    phoneNumber : string;
    city : string;
    avatarUri : string;
    status : UserStatus;

    constructor(id:number, firstName:string, lastName:string, username:string, email:string, phoneNumber:string, city:string, avatarUri:string, status:UserStatus){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.avatarUri = avatarUri;
        this.status = status;
    }
}

enum UserStatus {
    REQUESTED,
    ACTIVE, 
    INACTIVE
}
