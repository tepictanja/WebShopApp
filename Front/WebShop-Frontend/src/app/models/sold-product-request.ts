export class SoldProductRequest{
    productId : number;
    customerId: number;

    constructor(productId: number, customerId: number){
        this.productId = productId;
        this.customerId = customerId;
    }
}