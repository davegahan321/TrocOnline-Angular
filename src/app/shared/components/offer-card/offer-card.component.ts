import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OffersObject } from 'src/app/models/offerModel';
import { OffersService } from '../../services/offers.service';
import { Offer_ItemsObject } from 'src/app/models/offer_itemsModel';
import { ItemsService } from '../../services/items.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css'],
  changeDetection :ChangeDetectionStrategy.OnPush
})
export class OfferCardComponent  implements OnInit{

  constructor(private http: HttpClient,private offersService: OffersService,private itemService: ItemsService,private authService:AuthService) { }

  @Input() Offers! :OffersObject
  @Input() Offer_Items! :Offer_ItemsObject
  itemsdescription :any;
  iteminfo1:any;
  player1info:any;
  iteminfo2:any;
  player2info:any;
  

  ngOnInit(): void {
    this.offersService.GetOffer_ItemsById(this.Offers.id).subscribe((response)=>{
      this.itemsdescription= response;
      console.log(this.itemsdescription);
      this.itemService.getItemId(this.itemsdescription[0].item_Id).subscribe((response)=>{
        this.iteminfo1=response;
        console.log(this.iteminfo1);
      });
      this.itemService.getItemId(this.itemsdescription[1].item_Id).subscribe((response)=>{
        this.iteminfo2=response;
        console.log(this.iteminfo2);
      });
    });
    this.authService.getPlayerInfo(this.Offers.offerer_Id).subscribe((response)=>{
      this.player1info=response;
      console.log(this.player1info);
    });
    this.authService.getPlayerInfo(this.Offers.receiver_Id).subscribe((response)=>{
      this.player2info=response;
      console.log(this.player2info);
    });
  }

  onDelete(id:number){
    this.offersService.deleteOffer(id).subscribe();
  }

  onAccept(offerid:number){
    var string1:string;
    var string2:string;
    var model1:any;
    var model2:any;
    var Owner_Id:string;
    string1 = this.player1info[0].id;
    console.log(string1);
    string2 = this.player2info[0].id;
    console.log(string2)
    Owner_Id=string2;
    model1={
      Owner_Id
    }
    this.itemService.UpdateOwner_Id(this.iteminfo1.id,model1).subscribe();
    Owner_Id=string1;
    model2={
      Owner_Id
    }
    this.itemService.UpdateOwner_Id(this.iteminfo2.id,model2).subscribe();
    this.offersService.deleteOffer(offerid).subscribe()

  }

  
}
