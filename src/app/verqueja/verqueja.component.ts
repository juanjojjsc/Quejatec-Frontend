import { Component, OnInit, Input } from '@angular/core';
import { Queja } from '../queja.model';
import { Subscription } from 'rxjs';
import { QuejasService } from '../quejas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verqueja',
  templateUrl: './verqueja.component.html',
  styleUrls: ['./verqueja.component.css']
})
export class VerquejaComponent implements OnInit {

  quejas: Queja[] = [];

  quejaId: string;

  private quejasSub: Subscription;

  constructor(public quejasSerivice: QuejasService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.quejaId = this.activatedRoute.snapshot.paramMap.get('id');

    //this.quejaId = "5dcd6fed9baf9b3a9cb10921";


    this.quejasSerivice.getQueja(this.quejaId);

    this.quejasSub = this.quejasSerivice.getQuejaUpdateListener()
    .subscribe((quejas: Queja[]) => {
      console.log("FETCHED", quejas);
      this.quejas = quejas;

    });

  }

}
