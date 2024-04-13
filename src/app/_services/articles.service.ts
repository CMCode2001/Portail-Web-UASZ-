import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:8001/articles';
  
  constructor(private _http: HttpClient) {}
  headers = new HttpHeaders({
    "Content-Type": "application/json", // Adjust this based on your server requirements
    // Add any additional headers as needed
  });

  // Configure the HTTP options with headers
  httpOptions = {
    headers: this.headers,
  };
  ajoutArticle(article: any): Observable<any> {
    return this._http.post(this.apiUrl,article, this.httpOptions);
  }

  getAllArticles(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  updateArticle(article: any): Observable<any> {
    const mon_Url = `${this.apiUrl}/${article.id}`;
    return this._http.put<any>(mon_Url, article);
  }

  deleteArticle(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
  
}
