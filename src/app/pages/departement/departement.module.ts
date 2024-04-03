import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutingModule } from './departement-routing.module';
import { ListDepartementComponent } from './list-departement/list-departement.component';
import { DepartementComponent } from './departement/departement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    DepartementComponent,
    ListDepartementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DepartementRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class DepartementModule { }
