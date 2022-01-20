import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";
import {Location} from "@angular/common";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Order} from "../model/order";
import {ServerServiceService} from "../server-service.service";
import {PayDialogComponent} from "../pay-dialog/pay-dialog.component";

/*
Represents the shopping Cart
Shopping-cart.service takes more information
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  order: Order|undefined

  constructor(
    private serverService: ServerServiceService,
    private location: Location,
    public shoppingCardService: ShoppingCartService,
    public matDialog: MatDialog)
    { }

  ngOnInit(): void {

  }
  goBack(): void {
    this.location.back();

  }
  // open dialog to payment window
  submitOrder(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //if the user clicks outside, it does not close
    dialogConfig.id = "pay-component"; //id for css
   dialogConfig.autoFocus = true;
    const dialog = this.matDialog.open(PayDialogComponent, dialogConfig)
  }
  public localStorageItem(){
    return JSON.parse(localStorage.getItem("cart") || "[]");

  }
}
