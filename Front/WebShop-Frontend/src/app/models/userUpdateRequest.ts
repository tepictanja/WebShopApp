export class UserUpdateRequest{
    firstName: string;
    lastName: string;
    currentPassword: string;
    newPassword: string;
    email: string;
    phoneNumber: string;
    city: string;
    avatarUri: string;

    constructor(firstName: string, lastName: string, currentPassword: string, newPassword: string, email: string, phoneNumber: string, city: string, avatarUri: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.avatarUri = avatarUri;
    }
}