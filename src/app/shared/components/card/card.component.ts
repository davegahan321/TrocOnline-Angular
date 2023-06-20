import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsObject } from 'src/app/models/ItemModel';
import { RiverComponent } from 'src/app/pages/river/river.component';
import { ItemsService } from '../../services/items.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OffersService } from '../../services/offers.service';
import { Offer_ItemsObject } from 'src/app/models/offer_itemsModel';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection :ChangeDetectionStrategy.OnPush
})
export class CardComponent {

  

  constructor(private http: HttpClient,private router : Router,private actRouter :ActivatedRoute,private itemService: ItemsService,private offersService:OffersService) { }
 
  @Input() Items! : ItemsObject
  ItemsUrl= "https://localhost:44330/api/Items/";
  imageurl!:string 
  helper = new JwtHelperService();
  Token = sessionStorage.getItem('token');
  decodedToken : any = this.helper.decodeToken(this.Token!);
  
  userid= this.decodedToken.nameid;
  

  IsinInventory(){
    return this.router.url.includes('inventory');
  }

  EditItem(model:any){
    var ItemId= this.Items.id;
    return this.http.post(this.ItemsUrl +ItemId,model);

  }

  goToItemEdit(){
    var ItemId= this.Items.id;
    this.router.navigate(['/edit-item/',ItemId]).then(()=>window.location.reload());
  }

  yoink2(item:number,owner:string){
    var result:any;
    result = {
      item,
      owner
    }
    console.log("RECEIVER INFO",result);
    this.router.navigate(['inventory']);
    sessionStorage.setItem('RECEIVER_Item',result.item);
    sessionStorage.setItem('RECEIVER_Id',result.owner);
  }

  yoink1(item:number){
    var result:any;
    var owner=this.decodedToken.nameid;
    var model:any;
    var Offerer_Id:any;
    var Receiver_Id:any;
    result = {
      item,
      owner
    }
    console.log("OFFERER INFO",result);
    sessionStorage.setItem('OFFERER_Item',result.item);
    sessionStorage.setItem('OFFERER_Id',result.owner);

      Offerer_Id = sessionStorage.getItem('OFFERER_Id'),
      Receiver_Id = sessionStorage.getItem('RECEIVER_Id')

     model= {
      Offerer_Id,
      Receiver_Id
    }

    this.offersService.postOffer(model).subscribe((response:any)=>{
      console.log(response);
      var model1:any;
      var model2:any;
      var Item_Id : number; 
      var Offer_Id:any;

      Item_Id= Number(sessionStorage.getItem('OFFERER_Item'));
      Offer_Id = response.id
      model1 ={
        Item_Id ,
        Offer_Id
      }

      this.offersService.postOffer_Items(model1).subscribe((response)=>{
        console.log(response);
      });
      sessionStorage.removeItem('OFFERER_Item');
      Item_Id = Number(sessionStorage.getItem('RECEIVER_Item'));
      model2 ={
        Item_Id,
        Offer_Id
      }
      this.offersService.postOffer_Items(model2).subscribe((response)=>{
        console.log(response);
      });
      sessionStorage.removeItem('RECEIVER_Item');

    });
    sessionStorage.removeItem('OFFERER_Id');
    //sessionStorage.removeItem('OFFERER_Item');
    sessionStorage.removeItem('RECEIVER_Id');
    //sessionStorage.removeItem('RECEIVER_Item');
    
  }

  

}
