import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../_modèles/departement';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private apiUrl = 'http://localhost:3002/departements'; 

  constructor(private http: HttpClient) { }

  // Récupérer tous les départements
  getDepartements(): Observable<Departement> {
    return this.http.get<Departement>(this.apiUrl);
  }


  // Ajouter un nouveau département
  addDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.apiUrl, departement);
    
  }

  // Mettre à jour un département existant
  updateDepartement(departement: Departement): Observable<any> {
    const url = `${this.apiUrl}/${departement.id}`;
    return this.http.put(url, departement);
  }

  // Supprimer un département
  deleteDepartement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
    
  }
}
