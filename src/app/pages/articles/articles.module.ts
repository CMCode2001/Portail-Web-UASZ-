import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ArticlesComponent,
    FormulaireComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    NgxDatatableModule,
    HttpClientModule
  ]
})
export class ArticlesModule { }
