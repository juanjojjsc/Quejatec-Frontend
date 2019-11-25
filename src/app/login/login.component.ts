import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isAuth:boolean;

  constructor(private authService: AuthService) { }



  ngOnInit() {



  }

  login() {
    console.log("Got vefore logging in ",this.authService.getIsAuth());
    this.authService.setAuthFlagTrue();
    console.log("Got after logging in ",this.authService.getIsAuth());
  }

}
