import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router, UrlSerializer } from '@angular/router';
import { PlayerObject } from 'src/app/models/PlayerModel';
import { Token } from '@angular/compiler';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthUrl = "https://localhost:44330/api/Players/";
  PlayerIdUrl = "https://localhost:44330/api/Players/GetPlayerId/"
  helper = new JwtHelperService();
  decodedToken : any;
  Token = sessionStorage.getItem('token');
  constructor(private http: HttpClient, private router : Router) { }

  
  

  login(model: any){
    return this.http.post(this.AuthUrl + 'LoginPlayer',model).pipe(
      map((response : any) =>{
        const user = response;
        if(user.result.succeeded)
        {
          sessionStorage.setItem('token',user.token);
          this.decodedToken = this.helper.decodeToken(user.token);
          this.router.navigate(['']).then(()=>window.location.reload());
          console.log(this.decodedToken.nameid)
          //console.log(this.decodedToken);
        }
        console.log(response.status);
        //console.log(model);
       
      }
      )
    )
  }


  register(model :any){
    
    this.router.navigate(['']).then(()=>window.location.reload());
    return this.http.post(this.AuthUrl +'CreatePlayer',model);
    
  }

  loggedIn(){
    const token = sessionStorage.getItem('token');
    return !this.helper.isTokenExpired(token!);
  }

  getPlayerById(model :PlayerObject){
    return this.http.get(this.AuthUrl)
  }

  getPlayerId(){
  
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)
    console.log(this.decodedToken);
    //return this.http.get(this.PlayerIdUrl + this.decodedToken.nameid);
    return this.http.get<PlayerObject>(this.PlayerIdUrl + this.decodedToken.nameid).pipe(
      map((response : any) =>{
        console.log(response);
        const playerId = response;
        
        console.log(playerId);
        //sessionStorage.setItem('playerId',playerId.id.toString());
      }
    ));
    
    
  }

  getPlayerInfo(id:string){
    let headers = new HttpHeaders({
      'Authorization' : "Bearer "+this.Token!
    });
    let options = {headers:headers};
    const token = sessionStorage.getItem('token')
    this.decodedToken= this.helper.decodeToken(token!)

    return this.http.get(this.PlayerIdUrl+id,options);
  }

}
