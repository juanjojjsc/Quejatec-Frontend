import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth:boolean;
  private authListenerSub: Subscription;

  private flagUpdated = new Subject<boolean>();

  constructor(private authService: AuthService) { }

  ngOnInit() {



    this.isAuth = this.authService.getIsAuth();

    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
      console.log("Got in header",this.isAuth);
    });




  }


  logout() {
    console.log("Before logging out:",this.authService.getIsAuth());
    this.authService.setAuthFlagFalse();
    console.log("After logging out:",this.authService.getIsAuth());
    //window.location.reload();
  }

}
