export class NameValue {
    name: string;
    values: Value[] = new Array<Value>();

    constructor(name: string, values:  Array<Value>) {
        this.name = name;
        this.values = values;
    }


}

export class Value {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}