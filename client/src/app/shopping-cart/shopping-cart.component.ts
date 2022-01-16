import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";
import {Location} from "@angular/common";
import {Review} from "../model/review";
import {Order} from "../model/order";
import {ServerServiceService} from "../server-service.service";
/*
Represents the shopping Cart
Shopping-cart.service takes more information
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  order: Order|undefined

  constructor(
    private serverService: ServerServiceService,
    private location: Location,
    public shoppingCardService: ShoppingCartService) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();

  }
  submitOrder(){
    this.serverService.submitOrder(this.shoppingCardService.shoppingCart,"VISA",1).subscribe()

  }
}
