import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
 import { ListArticlesComponent } from './list-articles/list-articles.component';

const routes: Routes = [
  {path:"articles", component:ArticlesComponent},
  {path : "listeAllArticles", component:ListArticlesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
