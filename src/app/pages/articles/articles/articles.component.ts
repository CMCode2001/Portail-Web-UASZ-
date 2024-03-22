import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Article } from 'src/app/_modèles/Articles/articles';
import { ArticleService } from 'src/app/_services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  articles: Article[] = [];

  constructor(private _MonService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();

  }

  getArticles(): void {
    this._MonService.getArticles().subscribe(
      (data) => {
        this.articles = data; // Assignation des données récupérées à la variable articles
      },
      (error) => {
        console.log(error);
  });
  } 
}
