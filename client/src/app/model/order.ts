import { Item } from './item';

export interface Order {
  orderid: number; //server
  status: string;
  orderdate: Date;
  tableid: number;
  paymentreference: string; //server
  paymenttoken: string; // server
  totalamount: number;  //server
  ordereditems: Item[]; //client
}
