import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AppConfig } from './app.config';
const apiUrl = AppConfig.apiURL;

@Injectable({ providedIn: "root" })
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  private userId: string;
  private name: string;
  private level: string;
  private email: string;


  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return '5dcc86e89f0d08180f413288';
    //return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  setAuthFlagTrue() {
    this.isAuthenticated = true;
    //Update Subscription
    this.authStatusListener.next(true);
  }

  setAuthFlagFalse() {
    this.isAuthenticated = false;
    //Update Subscription
    this.authStatusListener.next(true);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  getName() {
    return this.name;
  }

  getLevel() {
    return this.level;
  }

  getEmail() {
    return this.email;
  }

  // createUser(email: string, password: string, name: string, level: string) {
  //   const authData: AuthData = { email, password, name, level };
  //   this.http.post(`${apiUrl}api/users/signup`, authData)
  //     .subscribe(response => {
  //       this.router.navigate(['/']);
  //     });
  // }


  // loginUser(email: string, password: string) {
  //   const authData: AuthData = { email, password, name: null, level: null };
  //   this.http.post<{token: string, expiresIn: number, userId: string, name: string, level: string, email: string}>(`${apiUrl}api/users/login`, authData)
  //     .subscribe(response => {
  //       //Retrieve Token
  //       const token = response.token;
  //       this.token = token;
  //       if (token) {
  //         //Save Token Duration
  //         const expiresInDuration = response.expiresIn;
  //         //Start timer
  //         this.setAuthTimer(expiresInDuration);
  //         //Update authStatus
  //         this.isAuthenticated = true;
  //         //Save User Data to the frontend
  //         this.userId = response.userId;
  //         this.name = response.name;
  //         this.level = response.level;
  //         this.email = response.email;
  //         //Update Subscription
  //         this.authStatusListener.next(true);

  //         //Save Data Locally
  //         const now = new Date();
  //         const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
  //         console.log(expirationDate);
  //         console.log("VAMOS A GUARDAR EMAIL:",this.email);
  //         console.log("VAMOS A GUARDAR NOMBRE:",this.name);
  //         this.saveAuthDataLocally(token, expirationDate, this.userId, this.name, this.level, this.email);
  //         //Redirect User to Home
  //         this.router.navigate(['/']);
  //       }
  //     });
  // }


  // Try to auto login if the token is still valid
  // autoAuthUser() {
  //   const authInformation = this.getLocalAuthData();
  //   if (!authInformation) {
  //     return;
  //   }
  //   const now = new Date();
  //   const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  //   if (expiresIn > 0) {
  //     this.token = authInformation.token;
  //     this.isAuthenticated = true;
  //     this.userId = authInformation.userId;
  //     this.name = authInformation.name;
  //     this.level = authInformation.level;
  //     this.email = authInformation.email;
  //     this.authStatusListener.next(true);
  //     this.setAuthTimer(expiresIn / 1000);
  //   }
  // }



  logoutUser() {
    //Reset timer
    clearTimeout(this.tokenTimer);
    //Reset token
    this.token = null;
    //Reset Local Storage
    this.clearAuthDataLocally();
    //Tell the app about authStatus
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.name = null;
    this.level = null;
    this.email = null;
    //Redirect User to Login
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    //Logout user when token expires with a timer
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  public saveAuthDataLocally(email: string, password: string) {
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);
  }

  private clearAuthDataLocally() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('level');
    localStorage.removeItem('email');
  }

  public getLocalAuthData() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    return {
      email: email,
      password: password
    }
  }

}
