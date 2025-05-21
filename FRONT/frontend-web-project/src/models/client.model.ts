export interface User {
    id: number | undefined;
    name: string;
    lastname: string;
    email: string;
    numberDocument: string;
    phoneNumber: string;
    password: string;
  }
  

export const empyUser: User = {
    id: undefined,
    name: "",
    lastname: "",
    email: "",
    numberDocument: "",
    phoneNumber: "",
    password: ""
  };