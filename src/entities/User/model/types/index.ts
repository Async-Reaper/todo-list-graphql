export interface IUser {
   id: number;
   name: string;
   username: string;
   email: string;
   address: IAddress;
   phone: string;
   website: string;
}

interface IAddress {
   street: string;
   suite: string;
   city: string;
   zipcode: string;
   geo: IGeo;
}

interface IGeo {
   lat: number;
   lng: number;
}
