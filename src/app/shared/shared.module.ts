import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './components/card/card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { OfferCardComponent } from './components/offer-card/offer-card.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    OfferCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    MatCardModule,
    MatButtonModule
  ],
  exports:[
    HeaderComponent,
    CardComponent,
    OfferCardComponent
  ]
})
export class SharedModule { }
