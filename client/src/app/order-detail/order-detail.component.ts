import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { ServerServiceService } from "../server-service.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderid: Number | undefined;
  orderitems: Item[] | undefined;

  constructor(
    private serverService: ServerServiceService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getOrderItems();
  }

  //Step back
  goBack(): void {
    this.location.back();
  }

  getOrderItems(): void {
    this.orderid = Number(this.route.snapshot.paramMap.get('id'));
    this.serverService.getOrderItems(this.orderid).subscribe(data => {
      this.orderitems = [];
      let items = data[0].ordereditems;

      for (let i of items) {
        this.serverService.getItem(i.itemid).subscribe(iditem => {
          let newItem = {} as Item;
          newItem.title = iditem[0].title
          newItem.itemid = i.itemid;
          newItem.amount = i.number;
          newItem.status = i.status;
          newItem.gotrated = i.gotrated;
          if (this.orderitems) {
             this.orderitems.push(newItem);
          }
        })
      }
    })
  }

  likeItem(item: Item): void {
    this.serverService.likeItem(item.itemid).subscribe();
  }

  dislikeItem(item: Item): void {
    this.serverService.dislikeItem(item.itemid).subscribe();
  }

}
