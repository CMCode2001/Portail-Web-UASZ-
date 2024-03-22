import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatistiqueRoutingModule } from './statistique-routing.module';
import { StatistiqueComponent } from './statistique/statistique.component';


@NgModule({
  declarations: [
    StatistiqueComponent
  ],
  imports: [
    CommonModule,
    StatistiqueRoutingModule
  ]
})
export class StatistiqueModule { }
