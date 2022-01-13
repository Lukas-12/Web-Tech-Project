import { Injectable } from '@angular/core';
import {Item} from "./model/item";

@Injectable({
  providedIn: 'root'
})
/*
Service Class for the ShoppingCart
 */
export class ShoppingCartService {
  shoppingCart: Item[] = [];
  constructor() { }

  //Add Item to shopping cart
  addItem(item: Item){
    const result = this.shoppingCart.find(isInCart => isInCart.itemid === item.itemid )
    if(result!=undefined){ //Item is in Array
      result.amount++;
    }else { //Add Item to Array
      item.amount = 1;
      this.shoppingCart.push(item);
    }
  }

  //Remove Item from shopping cart
  removeItem(item: Item){
    const result = this.shoppingCart.find(isInCart => isInCart.itemid === item.itemid )
    if(result!= undefined){ //Decrease amount of item
      result.amount--;
      if(result.amount === 0){ //Remove item from array
        this.shoppingCart.splice(this.shoppingCart.indexOf(item),1);
      }
    }
  }
}
