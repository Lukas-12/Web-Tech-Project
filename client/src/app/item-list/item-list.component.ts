import { Component, OnInit } from '@angular/core';
import {Item} from "../model/item";
import {ServerServiceService} from "../server-service.service";
import {Location} from "@angular/common";

/*
List of all Items in DB
 */
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(
    private serverService: ServerServiceService,
    private location: Location
    ) { }
  itemList: Item[] | undefined;

  ngOnInit(): void {
    this.getItems()
  }

  // Get all Items from DB
  getItems():void{
    this.serverService.getItemsToOrder().subscribe(itemList => this.itemList = itemList);

  }


}
