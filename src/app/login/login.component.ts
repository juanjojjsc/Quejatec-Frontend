import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isAuth: boolean;
  private authListenerSub: Subscription;

  private flagUpdated = new Subject<boolean>();

  constructor(private authService: AuthService) { }



  ngOnInit() {

    this.isAuth = this.authService.getIsAuth();

    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
      console.log("Got in login",this.isAuth);
    });



  }

  login() {
    console.log("Got vefore logging in ",this.authService.getIsAuth());
    this.authService.setAuthFlagTrue();
    console.log("Got after logging in ",this.authService.getIsAuth());
  }

}
