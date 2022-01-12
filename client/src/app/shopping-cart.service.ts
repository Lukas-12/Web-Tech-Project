import { Injectable } from '@angular/core';
import {Item} from "./model/item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart: Item[] = [];
  constructor() { }

  addItem(item: Item){
    const result = this.shoppingCart.find(isInCart => isInCart.itemid === item.itemid )
    if(result!=undefined){
      result.amount++;
    }else {
      item.amount = 1;
      this.shoppingCart.push(item);
    }
  }
}
