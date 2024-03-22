import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartenairesRoutingModule } from './partenaires-routing.module';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { ListPartenairesComponent } from './list-partenaires/list-partenaires.component';


@NgModule({
  declarations: [
    PartenairesComponent,
    ListPartenairesComponent

  ],
  imports: [
    CommonModule,
    PartenairesRoutingModule,
  ]
})
export class PartenairesModule { }
