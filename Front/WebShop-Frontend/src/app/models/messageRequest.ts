export class MessageRequest{
    title: string;
    content: string;
    userId: number;

    constructor(title: string, content: string, userId: number){
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
}