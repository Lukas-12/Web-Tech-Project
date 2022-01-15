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
        let newItem = {} as Item;
        this.serverService.getItem(i.itemid).subscribe(iditem => newItem.title = iditem[0].title)
        newItem.itemid = i.itemid;
        newItem.amount = i.number;
        newItem.status = i.status;
        newItem.gotrated = i.gotrated;
        this.orderitems.push(newItem);
      }
    })
  }

  likeItem(item: Item): void {
    console.log("id: " + item.itemid + " liked")
  }

  dislikeItem(item: Item): void {
    console.log("id: " + item.itemid + " disliked")
  }

}
