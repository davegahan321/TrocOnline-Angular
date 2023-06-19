import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OffersObject } from 'src/app/models/offerModel';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css'],
  changeDetection :ChangeDetectionStrategy.OnPush
})
export class OfferCardComponent  {

  constructor(private http: HttpClient) { }

  @Input() Offers! :OffersObject

}
