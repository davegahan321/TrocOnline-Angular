import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TrocOnline-Angular';
  helper = new JwtHelperService();


  constructor(private authService: AuthService){}
  ngOnInit(){
    const token = sessionStorage.getItem('token');
    this.authService.decodedToken = this.helper.decodeToken(token!);
  }
}
