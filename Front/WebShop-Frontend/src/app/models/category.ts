import { Attribute } from "@angular/core";

export class Category {
    id: number;
    name: string;
    subcategories: Category[];
    attributes: Attribute[];

    constructor(id:number, name:string, subcategories:Category[], attributes:Attribute[]){
        this.id = id;
        this.name = name;
        this.subcategories = subcategories;
        this.attributes = attributes;
    }
}
