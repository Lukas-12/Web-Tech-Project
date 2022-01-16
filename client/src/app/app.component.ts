import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "./shopping-cart.service";
import {ServerServiceService} from "./server-service.service";
import {Location} from "@angular/common";
import {Router, RouterModule} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Guest View';
  entered = false;
  constructor(
    private serverService: ServerServiceService,


  )
  {}
  ngOnInit() {
    if(localStorage.getItem("token") != null){
      this.entered = true;
    }else{
      this.entered = false
    }
  }

   login() {
    this.entered = this.serverService.login();
    console.log(this.entered)
  }

}
