import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, UrlSerializer } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService :AuthService ,private router : Router) { }

  ngOnInit(): void {
  }

  logOut(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('Pid');
    this.router.navigate(['']).then(()=>window.location.reload());
  }

}
