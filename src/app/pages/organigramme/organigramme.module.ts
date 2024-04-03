import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganigrammeRoutingModule } from './organigramme-routing.module';
import { OrganigrammeComponent } from './organigramme/organigramme.component';


@NgModule({
  declarations: [
    OrganigrammeComponent
  ],
  imports: [
    CommonModule,
    OrganigrammeRoutingModule
  ]
})
export class OrganigrammeModule { }
