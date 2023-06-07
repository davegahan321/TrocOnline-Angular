import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PlayerObject } from 'src/app/models/PlayerModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Accounts: any;

  constructor(private authService: AuthService) {}
  // private http: HttpClient

  ngOnInit(): void {
    //this.getAccounts();
  }

  // getAccounts(){
  //   return this.http.get("https://localhost:44367/Account/GetAccounts").subscribe(response => {
  //     console.log(response);
  //     this.Accounts = response;
  //   }, error => {
  //     console.log(error);
  //   })
  // }
    onSubmit(f: NgForm) {

      const loginObserver = {
        next: (x: void) => console.log('User Logged in Succeesfully'),
        error: (err: Error) => console.log(err)
        //complete: () => console.log('Observer got a complete notification'),
      };
      

      this.authService.login(f.value).subscribe(loginObserver);
      
      
      //this.authService.getPlayerById().subscribe(loginObserver);
      // console.log(f.value);  // { first: '', last: '' }
      // console.log(f.valid);  // false
  }

}
