import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemListComponent} from "./item-list/item-list.component";
import {ItemDetailComponent} from "./item-detail/item-detail.component";

const routes: Routes = [
  {path:'itemList',component: ItemListComponent},
  {path:'itemDetail/:id',component: ItemDetailComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
