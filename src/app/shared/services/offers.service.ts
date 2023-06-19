import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OffersObject } from 'src/app/models/offerModel';
import { Offer_ItemsObject } from 'src/app/models/offer_itemsModel';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  offersUrl= "https://localhost:44330/api/Offers/"
  offer_itemUrl= "https://localhost:44330/api/Offer_Items/"
  helper = new JwtHelperService();
  decodedToken : any;
  Token = sessionStorage.getItem('token');
  
  constructor(private http: HttpClient) { }

  getOffers(){
    let headers = new HttpHeaders({
           'Authorization' : "Bearer "+this.Token!
         });
    let options = {headers:headers};
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)
    console.log(this.decodedToken.nameid);

    return this.http.get<OffersObject[]>(this.offersUrl+'GetOffersById/'+this.decodedToken.nameid,options);
  }

  postOffer(model:OffersObject){ //recId:string
    let headers = new HttpHeaders({
           'Authorization' : "Bearer "+this.Token!
         });
    let options = {headers:headers};
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)
    console.log(this.decodedToken.nameid);
    //model.Offerer_Id=this.decodedToken.nameid;
    //model.Receiver_Id=recId;
    

    return this.http.post(this.offersUrl,model,options);
  }

  getOffer_Items(){
    let headers = new HttpHeaders({
           'Authorization' : "Bearer "+this.Token!
         });
    let options = {headers:headers};
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)
    console.log(this.decodedToken.nameid);

    return this.http.get(this.offer_itemUrl,options);
  }

  postOffer_Items(model:Offer_ItemsObject,item:number,offer:number){
    let headers = new HttpHeaders({
           'Authorization' : "Bearer "+this.Token!
         });
    let options = {headers:headers};
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)
    console.log(this.decodedToken.nameid);

    model.Item_Id=item;
    model.Offer_Id=offer;
    
    return this.http.post(this.offer_itemUrl,model,options)
  }

}
