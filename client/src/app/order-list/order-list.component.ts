import { Component, OnInit } from '@angular/core';
import { ServerServiceService } from "../server-service.service";
import { Location } from "@angular/common";
import { Order } from '../model/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList: Order[] | undefined;

  constructor(
    private serverService: ServerServiceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.serverService.getOrders().subscribe(orderList => {
      this.orderList = orderList;
      this.orderList.sort(function (a, b) { //Sort orders by time
        return a.orderdate.getTime() - b.orderdate.getTime();
        });
    });
  }
}
