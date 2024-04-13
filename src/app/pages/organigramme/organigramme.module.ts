import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganigrammeRoutingModule } from './organigramme-routing.module';
import { CompositionsDirectionsComponent } from './compositions-directions/compositions-directions.component';
import { OrganigrammeComponent } from './organigramme/organigramme.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectionsComponent } from './directions/directions.component';


@NgModule({
  declarations: [
    CompositionsDirectionsComponent,
    OrganigrammeComponent,
    DirectionsComponent
  ],
  imports: [
    CommonModule,
    OrganigrammeRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OrganigrammeModule { }
