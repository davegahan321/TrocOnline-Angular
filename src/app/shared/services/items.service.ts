import { Injectable, Renderer2 } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { map, Observable, subscribeOn } from 'rxjs';
import { ItemsObject } from 'src/app/models/ItemModel';
import { filter, take, tap } from 'rxjs/operators';
import { PlayerObject } from 'src/app/models/PlayerModel';
import {AuthService} from '../services/auth.service'
import { JwtHelperService } from '@auth0/angular-jwt';
import { identifierName } from '@angular/compiler';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UpdateOwner_IdObject } from 'src/app/models/UpdateOwner_IdModel';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  ItemsUrl= "https://localhost:44330/api/Items/";
  PlayersUrl = "https://localhost:44330/api/Players";
  PlayerIdUrl = "https://localhost:44330/api/Players/GetPlayerId/"
  InventoryUrl = "https://localhost:44330/api/Items/GetInvetoryItems/"
  helper = new JwtHelperService();
  decodedToken : any;
  Token = sessionStorage.getItem('token');
  private items = Observable<ItemsObject[]>;
  private player : string ='';
  
  constructor(private http: HttpClient,private router: ActivatedRoute,private router2:Router,private firestorage:AngularFireStorage) { }
  
  getAllItems(): Observable<ItemsObject[]>{
    let headers = new HttpHeaders({
           'Authorization' : "Bearer "+this.Token!
         });
    let options = {headers:headers};
    // if(<ItemsObject>.toSale == true){
    //   return this.http.get<ItemsObject[]>(this.ItemsUrl,options)
    // }
    
    return this.http.get<ItemsObject[]>(this.ItemsUrl,options)
    

  }

  getAllSaledItems(){
    
    return this.getAllItems().pipe(
      map(items => items.filter(item =>item.toSale == true)));
  }

  getInventoryItems(){
    let headers = new HttpHeaders({
      'Authorization' : "Bearer "+this.Token!
    });
    let options = {headers:headers};
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)
    console.log(this.decodedToken.nameid);
    return this.http.get<ItemsObject[]>(this.InventoryUrl+this.decodedToken.nameid,options)
  }

  

  AddItem(model:ItemsObject,url:string){
    let headers = new HttpHeaders({
      'Authorization' : "Bearer "+this.Token!
    });
    let options = {headers:headers};

  
    
    

    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)
    console.log(this.decodedToken.nameid);
    model.owner_Id =this.decodedToken.nameid;
    model.imageUrl=url;
    
    //this.router2.navigate(['inventory']).then(()=>window.location.reload());
    return this.http.post(this.ItemsUrl+'AddItem',model,options)
  }

  getItemId(id:number){
    let headers = new HttpHeaders({
      'Authorization' : "Bearer "+this.Token!
    });
    let options = {headers:headers};
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)
    return this.http.get(this.ItemsUrl+id,options)
  }

  updateItem(id :number,model:ItemsObject,url:string){
    let headers = new HttpHeaders({
      'Authorization' : "Bearer "+this.Token!
    });
    let options = {headers:headers};
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)
    model.owner_Id =this.decodedToken.nameid;
    model.id= id;
    model.imageUrl=url;
    console.log(model);
    this.router2.navigate(['inventory']).then(()=>window.location.reload());
    return this.http.put<ItemsObject[]>(this.ItemsUrl+id,model,options);
  }

  deleteItem(id :number){
    let headers = new HttpHeaders({
      'Authorization' : "Bearer "+this.Token!
    });
    let options = {headers:headers}
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!);
    this.router2.navigate(['inventory']).then(()=>window.location.reload());
    return this.http.delete(this.ItemsUrl+id,options);
  }

  getImagebyItemId(id:number){
    let headers = new HttpHeaders({
      'Authorization' : "Bearer "+this.Token!
    });
    let options = {headers:headers}
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!);
    return this.http.get(this.ItemsUrl+'getImage/'+id,options);
  }

  UpdateOwner_Id(id:number,model:UpdateOwner_IdObject){
    let headers = new HttpHeaders({
      'Authorization' : "Bearer "+this.Token!
    });
    let options = {headers:headers}
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!);

    return this.http.put(this.ItemsUrl+"UpdateOwner_Id/"+id,model,options);
  }
  
}
