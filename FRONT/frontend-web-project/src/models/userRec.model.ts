import { TypeDocument } from "./typeDoc.enum";
export interface UserRequest {

    name: string;
    lastname: string;
    email: string;
    typeDocument: TypeDocument;
    numberDocument: string;

    phoneNumber: string;

    password: string;
}
export const emptyUserRequest: UserRequest = {

    numberDocument: "",
    typeDocument: TypeDocument.CC,
    name: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: ""
}