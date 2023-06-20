import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OffersObject } from 'src/app/models/offerModel';
import { Offer_ItemsObject } from 'src/app/models/offer_itemsModel';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private offersService: OffersService) { }
  offers = new Observable<OffersObject[]>();
  offer_items = new Observable<Offer_ItemsObject[]>();
  
  ngOnInit(): void {
    this.offers=this.offersService.getOffers();
    
  }

}
