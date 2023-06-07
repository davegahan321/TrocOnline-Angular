import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  values: any;
  constructor(private http :HttpClient) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(){
    return this.http.get("https://localhost:44337/api/Players/").subscribe(response =>{
      console.log(response)
      this.values = response;
    }, error =>{
      console.log(error);
    });
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}
