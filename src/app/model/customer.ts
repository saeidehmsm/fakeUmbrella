import { City } from "./city";

export interface Customer {
  id?: string;
  name: string;
  contactPerson: string;
  phone: string;
  location: number; //cityId
  employeeCount: number;
}
