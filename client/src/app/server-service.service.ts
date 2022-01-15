import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Item} from "./model/item";
import { Observable } from 'rxjs';
import {ItemListComponent} from "./item-list/item-list.component";
import {Review} from "./model/review";
import { Order } from './model/order';
@Injectable({
  providedIn: 'root'
})
/*
Here you can find all DB handlers
 */
export class ServerServiceService {

  constructor(private httpclient: HttpClient){}


  // TODO: write your DB handlers below
  //Get all Items from DB
  public getItemsToOrder():Observable<Item[]> {
    return this.httpclient.get<Item[]>("http://localhost:3000/itemsToOrder");
  }

  //Get a single item from DB
  public getItem(id:Number): Observable<Item[]>{
    return this.httpclient.get<Item[]>("http://localhost:3000/itemsToOrder/" + id);
  }

  //Get all reviews form DB
  public getReviews(): Observable<Review[]>{
    return this.httpclient.get<Review[]>("http://localhost:3000/reviews");
  }

  //Post a new review to DB
  public postReview(review:Review): Observable<Review>{
    return this.httpclient.post<Review>("http://localhost:3000/reviews",review)
  }

  //Get all orders from DB
  public getOrders(): Observable<Order[]> {
    return this.httpclient.get<Order[]>("http://localhost:3000/orders");
  }

  public getOrderItems(id: Number): Observable<any> {
    return this.httpclient.get<any>("http://localhost:3000/orderItems/" + id);
  }

}
