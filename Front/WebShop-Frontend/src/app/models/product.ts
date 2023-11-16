import { Category } from "./category";
import { Image } from "./image";
import { ProductAttribute } from "./product-attribute";
import { User } from "./user";
import { Comment } from "./comment";

export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    isNew: boolean;
    location: string;
    creationDate : Date;
    quantity: number;
    status: ProductStatus;
    //sallerId: number;
    saller: User;
    images: Image[] = [];
    productAttributes: ProductAttribute[] = [];
    buyerId: number;
    categoryId: number;
    comments: Comment[] = [];
    //category: Category;

    constructor(id:number, name: string, description: string, price: number, isNew: boolean, location: string, creationDate: Date, quantity: number, status: ProductStatus, saller: User, images: Image[], productAttributes: ProductAttribute[], buyerId: number, categoryId: number, comments: Comment[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.isNew = isNew;
        this.location = location;
        this.creationDate = creationDate;
        this.quantity = quantity;
        this.status = status;
        this.saller = saller;
        this.images = images;
        this.buyerId = buyerId;
        //this.images = images;
        this.productAttributes = productAttributes;
        this.categoryId = categoryId;
        this.comments = comments;
    }
}

enum ProductStatus {
    ACTIVE,
    SOLD,
    INACTIVE
}
