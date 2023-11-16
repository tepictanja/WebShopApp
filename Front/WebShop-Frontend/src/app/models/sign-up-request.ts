export class SignUpRequest {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    city: string;
    avatarUri:string;

    constructor(firstName:string, lastName:string, username:string, password:string, email:string, phoneNumber:string, city:string, avatarUri:string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.avatarUri = avatarUri;
    }
}
