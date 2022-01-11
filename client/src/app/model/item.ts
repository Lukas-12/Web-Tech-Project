export interface Item{
  itemid: number;
  title: string;
  desc: string;
  price: number;
  categories: number[];
  allergens: string[];
  status: string;
  likescount: number;
  dislikescount: number;
}
