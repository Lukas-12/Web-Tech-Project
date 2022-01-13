import { Component, OnInit } from '@angular/core';
import {Item} from "../model/item";
import {ActivatedRoute} from "@angular/router";
import {ServerServiceService} from "../server-service.service";
import { Location } from '@angular/common';
import {ShoppingCartService} from "../shopping-cart.service";
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
/*
Represents a detail view of an Item
 */
export class ItemDetailComponent implements OnInit {
  item: Item[] | undefined

  constructor(
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    private itemService: ServerServiceService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
   this.getItem();
  }

  //Get the selected Item from the DB
  getItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id).subscribe(item => this.item = item);


  }
  //Step back
  goBack(): void {
    this.location.back();
  }

  //Add the Item to the shopping cart
  addItem():void{
    // @ts-ignore
    this.shoppingCartService.addItem(this.item[0]);
  }

  //Remove item from shopping cart
  //TODO add to HTML or not?
  removeItem():void{
    // @ts-ignore
    this.shoppingCartService.removeItem(this.item[0]);
  }

}
