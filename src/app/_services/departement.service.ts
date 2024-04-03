import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../_modèles/departement';
//import { Departement } from '../_modèles/departement';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private apiUrl = 'http://localhost:4004/departements'; 

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({
    "Content-Type": "application/json", // Adjust this based on your server requirements
    // Add any additional headers as needed
  });

  // Configure the HTTP options with headers
  httpOptions = {
    headers: this.headers,
  };


  getAllDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }

  
  createDepartement(departement: any): Observable<any> {
    return this.http.post(this.apiUrl, departement,this.httpOptions);
  }

 

  updateDepartement(departement: any): Observable<any> {
    const mon_Url = `${this.apiUrl}/${departement.id}`;
    return this.http.put<any>(mon_Url, departement);
  }

  deleteDepartement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
