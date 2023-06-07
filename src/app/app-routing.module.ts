import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RiverComponent } from './pages/river/river.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import {OffersComponent} from './pages/offers/offers.component';
import {ItemFormComponent} from './pages/item-form/item-form.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';

const routes: Routes = [
  { path: '' , component :HomeComponent },
  { path: 'river' , component :RiverComponent },
  { path: 'inventory' , component :InventoryComponent },
  { path: 'offers' , component : OffersComponent},
  { path: 'item-form',component : ItemFormComponent},
  { path: 'edit-item/:id',component : EditItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
