import { User } from "./user";

export class Comment{
    content: string;
    user: User;

    constructor(content: string, user: User){
        this.content = content;
        this.user = user;
    }

}