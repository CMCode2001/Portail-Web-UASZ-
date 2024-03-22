import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenceRoutingModule } from './licence-routing.module';
import { LicenceComponent } from './licence.component';


@NgModule({
  declarations: [
    LicenceComponent
  ],
  imports: [
    CommonModule,
    LicenceRoutingModule
  ]
})
export class LicenceModule { }
