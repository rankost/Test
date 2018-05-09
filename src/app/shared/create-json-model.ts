import { NameValue } from "./name-value";
import { Serializer } from "@angular/compiler";
//import { trigger } from "@angular/core";

export class createJsonMode {
    dn: string;
    attributes: NameValue[] = new Array<NameValue>();
}

export class resultStatus{
    resultStatus: string;
    message: string;
    userDN: string;

    constructor (resultStatus: string, message?: string, userDN?: string) {
        this.resultStatus= resultStatus;
        this.message = message;
        this.userDN = userDN;
    }

}