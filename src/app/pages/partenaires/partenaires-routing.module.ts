import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartenairesComponent} from "./partenaires/partenaires.component";

const routes: Routes = [
  {path: "partenaires", component: PartenairesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartenairesRoutingModule { }
