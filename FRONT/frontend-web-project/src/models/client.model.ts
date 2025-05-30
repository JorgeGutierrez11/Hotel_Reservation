import { TypeDocument } from "./typeDoc.enum";
export interface Client {
    id: number;
    name: string;
    lastname: string;
    email: string;
    typeDocument: TypeDocument;
    numberDocument: string;
    phoneNumber: string;
    password: string;
}

export const emptyClient: Client = {
    id:0,
    numberDocument: "",
    typeDocument: TypeDocument.CC,
    name: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: ""
}
export const empyUser: Client = {
    id:0,
    numberDocument: "",
    typeDocument: TypeDocument.CC,
    name: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: ""
}