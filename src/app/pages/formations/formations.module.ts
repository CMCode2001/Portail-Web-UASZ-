import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationsRoutingModule } from './formations-routing.module';
import { FormationsComponent } from './formations/formations.component';
import { ListFormationsComponent } from './list-formations/list-formations.component';


@NgModule({
  declarations: [
    FormationsComponent,
    ListFormationsComponent
  ],
  imports: [
    CommonModule,
    FormationsRoutingModule
  ]
})
export class FormationsModule { }
