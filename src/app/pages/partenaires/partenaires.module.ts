import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartenairesRoutingModule } from './partenaires-routing.module';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { ListPartenairesComponent } from './list-partenaires/list-partenaires.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PartenairesComponent,
    ListPartenairesComponent

  ],
  imports: [
    CommonModule,
    PartenairesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PartenairesModule { }
