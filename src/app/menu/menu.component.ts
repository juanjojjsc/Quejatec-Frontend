import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlaceService } from '../place.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {



  private placesSub: Subscription;

  places: any[] = [];
  pokemonControl = new FormControl();

  // pokemonGroups: PokemonGroup[] = [
  //   {
  //     name: 'Grass',
  //     pokemon: [
  //       {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
  //       {value: 'oddish-1', viewValue: 'Oddish'},
  //       {value: 'bellsprout-2', viewValue: 'Bellsprout'}
  //     ]
  //   },
  //   {
  //     name: 'Water',
  //     pokemon: [
  //       {value: 'squirtle-3', viewValue: 'Squirtle'},
  //       {value: 'psyduck-4', viewValue: 'Psyduck'},
  //       {value: 'horsea-5', viewValue: 'Horsea'}
  //     ]
  //   },
  //   {
  //     name: 'Fire',
  //     disabled: true,
  //     pokemon: [
  //       {value: 'charmander-6', viewValue: 'Charmander'},
  //       {value: 'vulpix-7', viewValue: 'Vulpix'},
  //       {value: 'flareon-8', viewValue: 'Flareon'}
  //     ]
  //   },
  //   {
  //     name: 'Psychic',
  //     pokemon: [
  //       {value: 'mew-9', viewValue: 'Mew'},
  //       {value: 'mewtwo-10', viewValue: 'Mewtwo'},
  //     ]
  //   }
  // ];


  constructor(public placeService: PlaceService) { }

  ngOnInit() {

    // this.pokemonControl.valueChanges.subscribe();

    // this.placeService.getPlaces();

    // // console.log(this.placeService.getPlaces());

    // this.placesSub = this.placeService.getPlaceUpdateListener()
    // .subscribe((places: Place[]) => {
    //   console.log("FETCHED");
    //   this.places = places;
    //   console.log("Frontend Places: ",this.places);
    // });





  }

}
