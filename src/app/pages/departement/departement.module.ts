import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutingModule } from './departement-routing.module';
import { ListDepartementComponent } from './list-departement/list-departement.component';
import { DepartementComponent } from './departement/departement.component';


@NgModule({
  declarations: [
    DepartementComponent,
    ListDepartementComponent
  ],
  imports: [
    CommonModule,
    DepartementRoutingModule
  ]
})
export class DepartementModule { }
