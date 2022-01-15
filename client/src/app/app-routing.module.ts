import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemListComponent} from "./item-list/item-list.component";
import {ItemDetailComponent} from "./item-detail/item-detail.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ReviewListComponent} from "./review-list/review-list.component";
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  { path: 'itemList', component: ItemListComponent},
  { path: 'itemDetail/:id', component: ItemDetailComponent},
  { path: 'shoppingCart', component: ShoppingCartComponent},
  { path: 'reviews', component: ReviewListComponent },
  { path: 'orderList', component: OrderListComponent },
  { path: 'orderDetail/:id', component: OrderDetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
