import { ProductAttribute } from "./product-attribute";

export class FilterProductsRequest{
    category: string;
    productAttributes: ProductAttribute[] = [];
    location: string;
    priceFrom: number;
    priceTo: number;

    constructor(category: string, productAttributes: ProductAttribute[], location: string, priceFrom: number, priceTo: number){
        this.category = category;
        this.productAttributes = productAttributes;
        this.location = location;
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
    }
}