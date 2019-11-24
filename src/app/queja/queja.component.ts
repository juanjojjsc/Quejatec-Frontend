import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';
import { QuejasService } from '../quejas.service';

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

  private placesSub: Subscription;

  constructor(public placeService: PlaceService, public quejasService: QuejasService) { }

  ngOnInit() {
    this.placeService.getPlaces();


    this.placesSub = this.placeService.getPlaceUpdateListener()
    .subscribe((places: Place[]) => {
      console.log("FETCHED");
      this.places = places;
      console.log("Frontend Places: ",this.places);

    })
  }

  postQueja() {

    console.log("Enviando Queja");
    this.description = this.descControl.value;

    console.log("DESC: ",this.description);

    let place = this.pokemonControl.value;
    //place = "5dd5cd9dfcb8f30b2f5c1d68";
    console.log("PLACE: ",place);

    this.quejasService.postQueja(null,this.description,place,null,null,null);


  }

}
