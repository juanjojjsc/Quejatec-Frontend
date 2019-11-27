import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validEmails = ["admin@admin.com","alumno@tec.com"];
  validPassword = "12345";

  isAuth: boolean;
  private authListenerSub: Subscription;

  private flagUpdated = new Subject<boolean>();

  emailControl = new FormControl();
  passwordControl = new FormControl();

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }



  ngOnInit() {

    this.isAuth = this.authService.getIsAuth();

    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
      console.log("Got in login",this.isAuth);
    });



  }

  login() {


    if (this.emailControl.valid && this.passwordControl.valid) {
      console.log(this.emailControl.value);
      console.log(this.passwordControl.value);
      const validatedEmail = this.validEmails.includes(this.emailControl.value);
      const validatedPassword = (this.validPassword === this.passwordControl.value);
      console.log("Email is valid:",validatedEmail);
      console.log("Password is valid:",validatedPassword);
      if (validatedEmail && validatedPassword) {
        this.authService.setAuthFlagTrue();
        this.authService.saveAuthDataLocally(this.emailControl.value, this.passwordControl.value);
        //segue to quejas
        this.router.navigateByUrl("/queja");
      } else {
        if(!validatedEmail && !validatedPassword) {
          console.log("Invalid Email and Password");
          this.snackBar.open("Email y Password incorrectos.", "OK", {
            duration: 4000,
          });
        }
        if(!validatedPassword) {
          console.log("Invalid Password");
          this.snackBar.open("Password incorrecta.", "OK", {
            duration: 4000,
          });
        }
        if(!validatedEmail) {
          console.log("Invalid Email");
          this.snackBar.open("Email incorrecto.", "OK", {
            duration: 4000,
          });
        }
      }
    }



  }

}
