export class Attribute {
    id:number;
    name:string;
    type:AttributeType;

    constructor(id:number, name:string, type:AttributeType){
        this.id = id;
        this.name = name;
        this.type = type;
    }

}

enum AttributeType {
    STRING,
    INT,
    DOUBLE
}
