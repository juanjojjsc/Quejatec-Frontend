import { Component, OnInit, Input } from '@angular/core';
import { Queja } from '../queja.model';
import { Subscription } from 'rxjs';
import { QuejasService } from '../quejas.service';

@Component({
  selector: 'app-misquejas',
  templateUrl: './misquejas.component.html',
  styleUrls: ['./misquejas.component.css']
})
export class MisquejasComponent implements OnInit {

  @Input() quejas: Queja[] = [];

  private quejasSub: Subscription;

  creatorId = '5dcc86e89f0d08180f413288';


  constructor(public quejasSerivice: QuejasService) { }

  ngOnInit() {

    console.log("In");

    this.quejasSerivice.getQuejas();

    // console.log(this.quejasSerivice.getQuejas());

    this.quejasSub = this.quejasSerivice.getQuejaUpdateListener()
    .subscribe((quejas: Queja[]) => {
      console.log("FETCHED");
      this.quejas = quejas;
      
    });
    // this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
    //   this.userIsAuthenticated = isAuthenticated;
    //   this.userId = this.authService.getUserId();
    // });

  }

}
