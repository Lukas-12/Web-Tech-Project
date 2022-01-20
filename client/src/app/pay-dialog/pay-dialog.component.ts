import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ServerServiceService} from "../server-service.service";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-pay-dialog',
  templateUrl: './pay-dialog.component.html',
  styleUrls: ['./pay-dialog.component.css']
})
export class PayDialogComponent implements OnInit {
 selected = 'none'

  constructor(
    public dialogRef: MatDialogRef<PayDialogComponent>,
    private serverService : ServerServiceService,
    private shoppingCardService : ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  actionFunction() {
    this.shoppingCardService.shoppingCart = [] //delete shopping cart
    this.serverService.submitOrder(this.shoppingCardService.shoppingCart,this.selected,1).subscribe()
    alert("Thank you for your order!");
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

}
