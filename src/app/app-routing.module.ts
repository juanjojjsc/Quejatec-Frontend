import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaquejaComponent } from "./nuevaqueja/nuevaqueja.component";
import { VerquejaComponent} from "./verqueja/verqueja.component";
import { HomeComponent } from "./home/home.component";
import { MisquejasComponent } from "./misquejas/misquejas.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'queja', component: NuevaquejaComponent},
  { path: 'verqueja/:id', component: VerquejaComponent},
  { path: 'misquejas', component: MisquejasComponent},
  { path: ':id', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
