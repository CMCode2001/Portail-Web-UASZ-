import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formations } from '../_modèles/formations';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = `http://localhost:8007/services`;

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({
    "Content-Type": "application/json", // Adjust this based on your server requirements
    // Add any additional headers as needed
  });

  // Configure the HTTP options with headers
  httpOptions = {
    headers: this.headers,
  };

  getAllServices(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getServicesByDivision(departementId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?departementId=${departementId}`);
  }
  
  createFormations(formations: Formations): Observable<any> {
    return this.http.post(this.apiUrl, formations,this.httpOptions);
  }

  updateFormations(formations: any): Observable<any> {
    const mon_Url = `${this.apiUrl}/${formations.id}`;
    return this.http.put<any>(mon_Url, formations);
  }

  deleteFormations(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
