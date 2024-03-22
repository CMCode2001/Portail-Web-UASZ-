import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partenaires } from '../_modèles/partenaires';


@Injectable({
  providedIn: 'root'
})
export class PartenairesService {

  private apiUrl = 'http://localhost:3001/partenaires';

  constructor(private http: HttpClient) { }


  getPartenaires(): Observable<Partenaires[]> {
    return this.http.get<Partenaires[]>(this.apiUrl);
  }

  getPartenairesById(id: number): Observable<Partenaires> {
    return this.http.get<Partenaires>(`${this.apiUrl}/${id}`);
  }

  createPartenaires(Partenaires: Partenaires): Observable<Partenaires> {
    return this.http.post<Partenaires>(this.apiUrl, Partenaires);
  }

  // updateNomPart( partEdit: Partenaires): Observable<Partenaires> {
  //   return this.http.patch<Partenaires>(`${this.apiUrl}/${partEdit.id}`,{nomPart:!partEdit.nomPart});
  // }

  updatePartenaire(partenaire: Partenaires): Observable<Partenaires> {
    const mon_Url = `${this.apiUrl}/${partenaire.id}`;
    return this.http.put<Partenaires>(mon_Url, partenaire);
  }

  deletePartenaires(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
