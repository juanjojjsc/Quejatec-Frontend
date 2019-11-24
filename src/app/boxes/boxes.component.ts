import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuejasService } from '../quejas.service';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit {

  scoreControl = new FormControl('', [Validators.required]);

  private scoreSub: Subscription;

  constructor(public quejasSerivice: QuejasService) { }

  ngOnInit() {

  }

  postScore() {

    let score = this.scoreControl.value;


    this.quejasSerivice.postScore(0,"");

    // console.log(this.quejasSerivice.getQuejas());

    // this.quejasSub = this.quejasSerivice.getQuejaUpdateListener()
    // .subscribe((quejas: Queja[]) => {
    //   console.log("FETCHED");
    //   this.quejas = quejas;
    // });
  }

}
