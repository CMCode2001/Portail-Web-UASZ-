import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationsRoutingModule } from './formations-routing.module';
import { FormationsComponent } from './formations/formations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    FormationsComponent,
  ],
  imports: [
    CommonModule,
    FormationsRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FormationsModule { }
