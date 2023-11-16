import { Attribute } from "./attribute";

export class ProductAttribute {
    value:string;
    attribute:Attribute;

    constructor(value:string, attribute: Attribute){
        this.value = value;
        this.attribute = attribute;
    }
}
