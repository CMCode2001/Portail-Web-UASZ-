import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { AjouterArticlesComponent } from './ajouter-articles/ajouter-articles.component';
import { ModifierArticlesComponent } from './modifier-articles/modifier-articles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListArticlesComponent } from './list-articles/list-articles.component';


@NgModule({
  declarations: [
    ArticlesComponent,
    AjouterArticlesComponent,
    ModifierArticlesComponent,
    ListArticlesComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ArticlesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ArticlesModule { }
