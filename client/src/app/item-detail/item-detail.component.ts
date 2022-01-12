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

  getItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(id).subscribe(item => this.item = item);


  }
  goBack(): void {
    this.location.back();
  }
  addItem():void{
    // @ts-ignore
    this.shoppingCartService.addItem(this.item[0]);
  }

}