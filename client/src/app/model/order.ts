import { Item } from './item';

export interface Order {
  orderid: number;
  status: string;
  orderdate: Date;
  tableid: number;
  paymentreference: string;
  paymenttoken: string;
  totalamount: number;
  ordereditems: Item[];
}
