import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompositionsDirectionsComponent } from './compositions-directions/compositions-directions.component';
import { OrganigrammeComponent } from './organigramme/organigramme.component';

const routes: Routes = [
  {path:"organigramme", component:OrganigrammeComponent},
  {path:"compositions-directions", component:CompositionsDirectionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganigrammeRoutingModule { }
