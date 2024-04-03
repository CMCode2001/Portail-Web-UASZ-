import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partenaires } from '../_modèles/partenaires';


@Injectable({
  providedIn: 'root'
})
export class PartenairesService {

  private apiUrl = `http://localhost:4002/partenaires`;

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({
    "Content-Type": "application/json", // Adjust this based on your server requirements
    // Add any additional headers as needed
  });

  // Configure the HTTP options with headers
  httpOptions = {
    headers: this.headers,
  };


  getPartenaires(): Observable<Partenaires[]> {
    return this.http.get<Partenaires[]>(this.apiUrl);
  }

  
  createPartenaires(Partenaires: any): Observable<any> {
    return this.http.post(this.apiUrl, Partenaires,this.httpOptions);
  }

 

  updatePartenaire(partenaire: any): Observable<any> {
    const mon_Url = `${this.apiUrl}/${partenaire.id}`;
    return this.http.put<any>(mon_Url, partenaire);
  }

  deletePartenaires(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
