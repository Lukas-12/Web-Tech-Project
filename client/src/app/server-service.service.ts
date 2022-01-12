import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Item} from "./model/item";
import { Observable } from 'rxjs';
import {ItemListComponent} from "./item-list/item-list.component";
@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  constructor(private httpclient: HttpClient){}






  // TODO: write your DB handlers below
  //Get all Items from DB
  public getItemsToOrder():Observable<Item[]> {
    return this.httpclient.get<Item[]>("http://localhost:3000/itemsToOrder");
  }

  //Get a single item
  public getItem(id:Number): Observable<Item[]>{
    return this.httpclient.get<Item[]>("http://localhost:3000/itemsToOrder/" + id);
  }
}
