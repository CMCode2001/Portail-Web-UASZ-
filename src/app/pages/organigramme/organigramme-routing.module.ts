import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganigrammeComponent } from './organigramme/organigramme.component';

const routes: Routes = [
  {path:"organigramme", component:OrganigrammeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganigrammeRoutingModule { }
