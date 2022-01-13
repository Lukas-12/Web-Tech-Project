import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";
import {Location} from "@angular/common";
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

  constructor(
    private location: Location,
    public shoppingCardService: ShoppingCartService) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }
}
