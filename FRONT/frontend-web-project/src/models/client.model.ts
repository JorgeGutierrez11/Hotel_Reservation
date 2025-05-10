export interface Client {
    document: string;
    typeDocument: string;
    name: string;
    lastName: string;
    address: string;
    email: string;
    countryId: number; 
}

export const emptyClient: Client = {
    document: "",
    typeDocument: "", 
    name: "",
    lastName: "",
    address: "",
    email: "",
    countryId: 0
}