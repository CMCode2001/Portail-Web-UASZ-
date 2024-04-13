import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
 import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ModifierArticlesComponent } from './modifier-articles/modifier-articles.component';

const routes: Routes = [
  {path:"articles", component:ArticlesComponent},
  {path : "listeAllArticles", component:ListArticlesComponent},
  {path:"/updateArticle", component:ModifierArticlesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
