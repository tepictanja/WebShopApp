import { User } from "./user";

export class CommentRequest {
    content: string;
    productId: number;
    userId: number;

    constructor(content: string, productId: number, userId:number) {
        this.content = content;
        this.productId = productId;
        this.userId = userId;
    }

}