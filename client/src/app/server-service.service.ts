import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Item} from "./model/item";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  constructor(private httpclient: HttpClient){}

  public getItemsToOrder():Observable<Item[]> {
    return this.httpclient.get<Item[]>("http://localhost:3000/itemsToOrder");
  }
}
