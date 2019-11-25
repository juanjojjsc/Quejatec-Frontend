import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuejasService } from '../quejas.service';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';
import { MatSnackBar } from '@angular/material';


export interface Pokemon {
  value: string;
  viewValue: string;
}

export interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit {

  scoreControl = new FormControl('', [Validators.required]);

  private scoreSub: Subscription;

  private placesSub: Subscription;

  isLoggedIn = false;

  places: any[] = [];
  pokemonControl = new FormControl();

  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Grass',
      pokemon: [
        {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
        {value: 'oddish-1', viewValue: 'Oddish'},
        {value: 'bellsprout-2', viewValue: 'Bellsprout'}
      ]
    },
    {
      name: 'Water',
      pokemon: [
        {value: 'squirtle-3', viewValue: 'Squirtle'},
        {value: 'psyduck-4', viewValue: 'Psyduck'},
        {value: 'horsea-5', viewValue: 'Horsea'}
      ]
    },
    {
      name: 'Fire',
      disabled: true,
      pokemon: [
        {value: 'charmander-6', viewValue: 'Charmander'},
        {value: 'vulpix-7', viewValue: 'Vulpix'},
        {value: 'flareon-8', viewValue: 'Flareon'}
      ]
    },
    {
      name: 'Psychic',
      pokemon: [
        {value: 'mew-9', viewValue: 'Mew'},
        {value: 'mewtwo-10', viewValue: 'Mewtwo'},
      ]
    }
  ];

  constructor(public quejasSerivice: QuejasService, public placeService: PlaceService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.placeService.getPlaces();

    this.placesSub = this.placeService.getPlaceUpdateListener()
    .subscribe((places: Place[]) => {
      console.log("FETCHED");
      this.places = places;
      console.log("Frontend Places: ",this.places);

    });
  }

  openSnackBar() {
    this.snackBar.open("Queja Enviada", "OK", {
      duration: 4000,
    });
  }

  postScore() {

    this.openSnackBar();

    let score = this.scoreControl.value;
    console.log("SCORE: ",score);

    let place = this.pokemonControl.value;
    //place = "5dd5cd9dfcb8f30b2f5c1d68";
    console.log("PLACE: ",place);

    this.quejasSerivice.postScore(null,score,place);


  }


}

