import { ProductAttribute } from "./product-attribute";
import { Image } from "./image";

export class ProductRequest {
    name:string;
    description:string;
    price:number;
    isNew:boolean;
    location:string;
    quantity:number;
    sallerId:number;
    images : Image[] = [];
    attributes : ProductAttribute[] = [];
    categoryId : number;

    constructor(name:string, description:string, price:number, isNew:boolean, location:string, quantity:number, sallerId:number, images: Image[], attributes : ProductAttribute[], categoryId:number){
        this.name = name;
        this.description = description;
        this.price = price;
        this.isNew = isNew;
        this.location = location;
        this.quantity = quantity;
        this.sallerId = sallerId;
        this.images = images;
        this.attributes = attributes;
        this.categoryId = categoryId;
    }
}
