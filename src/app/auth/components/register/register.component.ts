import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    const registerObserver = {

      next : (x: any) => console.log('user registered !!'),
      error : (err: any) => console.log(err)
      // next: (x: void) => console.log('User Registered Succeesfully'),
      // error: (err: Error) => console.log(err)
      //complete: () => console.log('Observer got a complete notification'),
    };

    this.authService.register(f.value).subscribe(registerObserver);
  }


}
