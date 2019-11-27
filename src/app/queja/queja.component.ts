import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';
import { QuejasService } from '../quejas.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-queja',
  templateUrl: './queja.component.html',
  styleUrls: ['./queja.component.css']
})
export class QuejaComponent implements OnInit {
  places: any[] = [];
  pokemonControl = new FormControl();
  descControl = new FormControl();
  description: string;

  email: string;

  private placesSub: Subscription;

  constructor(public placeService: PlaceService, public quejasService: QuejasService, private snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {


    const authData = this.authService.getLocalAuthData();
    console.log("Got Local Data: ",authData.email);
    this.email = authData.email;

    this.placeService.getPlaces();


    this.placesSub = this.placeService.getPlaceUpdateListener()
    .subscribe((places: Place[]) => {
      console.log("FETCHED");
      this.places = places;
      console.log("Frontend Places: ",this.places);

    })
  }

  openSnackBar() {
    this.snackBar.open("Queja Enviada", "OK", {
      duration: 4000,
    });
  }

  postQueja() {


    this.openSnackBar();

    console.log("Enviando Queja");
    this.description = this.descControl.value;

    console.log("DESC: ",this.description);

    let place = this.pokemonControl.value;
    //place = "5dd5cd9dfcb8f30b2f5c1d68";
    console.log("PLACE: ",place);

    this.quejasService.postQueja(null,this.description,place,null,null,null);


  }

}
