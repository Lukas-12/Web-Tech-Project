import { Component, OnInit } from '@angular/core';
import {Item} from "../model/item";
import {ServerServiceService} from "../server-service.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private serverService: ServerServiceService) { }
  itemList: Item[] | undefined;

  ngOnInit(): void {
    this.getItems()
  }
  getItems():void{
    this.serverService.getItemsToOrder().subscribe(itemList => this.itemList = itemList);

  }

}
