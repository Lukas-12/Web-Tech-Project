import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Item} from "./model/item";
import { Observable, throwError, NEVER } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  public postReview(review: Review): Observable<Review>{
    return this.httpclient.post<Review>("http://localhost:3000/reviews",review)
  }

  //Get all orders from DB
  public getOrders(): Observable<Order[]> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
    }
    return this.httpclient.get<Order[]>("http://localhost:3000/orders", header).pipe(catchError(error => {
      if (!!error.status && error.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return NEVER;
      }
      return throwError(error);
    }));;
  }

  //Get all items from an order from DB
  public getOrderItems(id: Number): Observable<any> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
    }
    return this.httpclient.get<any>("http://localhost:3000/orderItems/" + id, header).pipe(catchError(error => {
      if (!!error.status && error.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return NEVER;
      }
      return throwError(error);
    }));;
  }

  public getTopSellerItems(topNumber: Number): Observable<Item[]> {
    return this.httpclient.get<Item[]>("http://localhost:3000/topSeller/" + topNumber);
  }

  //Like an item
   public likeItem (orderId: Number, itemId: Number) : Observable<any> {
     let header =  {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
    }
     return this.httpclient.post<any>("http://localhost:3000/likeItem/" + orderId + "/" + itemId, null, header).pipe(catchError(error => {
       if (!!error.status && error.status === 401) {
         localStorage.removeItem('token');
         window.location.href = '/';
         return NEVER;
       }
       return throwError(error);
     }));;
  }

  //Like an item
  public dislikeItem(orderId: Number, itemId: Number): Observable<any> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem("token")}`)
    }
    return this.httpclient.post<any>("http://localhost:3000/dislikeItem/" + orderId + "/" + itemId, null, header).pipe(catchError(error => {
      if (!!error.status && error.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return NEVER;
      }
      return throwError(error);
    }));;
  }

  public login()  {
    if(localStorage.getItem("token") === null ){
      this.httpclient.get<any>("http://localhost:3000/login" ).subscribe(token => {
        localStorage.setItem("token",token);
        console.log(localStorage.getItem("token"));
      })
      return true;
    }
    return false;
  }
  //submit order
  public submitOrder(items:  Item[], reference: String, table: number): Observable<any> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem("token")}`)
    }
    return this.httpclient.post<any>("http://localhost:3000/submitOrder", { items: items, reference: reference, table: table }, header).pipe(catchError(error => {
      if (!!error.status && error.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return NEVER;
      }
      return throwError(error);
    }));;
  }
}
