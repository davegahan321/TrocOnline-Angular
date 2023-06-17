import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { RiverComponent } from './pages/river/river.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { OffersComponent } from './pages/offers/offers.component';
import { ItemFormComponent } from './pages/item-form/item-form.component';
import { FormsModule } from '@angular/forms';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RiverComponent,
    InventoryComponent,
    OffersComponent,
    ItemFormComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
