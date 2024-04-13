import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private apiUrl = 'http://localhost:8004/departements';

  constructor(private http: HttpClient) { }

  getAllDepartements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDirectionByDepartement(departementId: number): Observable<any> {
    const url = `${this.apiUrl}/${departementId}/organigramme`;
    return this.http.get<any>(url);
  }
  getDepartementByDirection(departementId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?departementId=${departementId}`);
  }
  createDepartement(departement: any): Observable<any> {
    return this.http.post(this.apiUrl, departement);
  }

  updateDepartement(departement: any): Observable<any> {
    const mon_Url = `${this.apiUrl}/${departement.id}`;
    return this.http.put<any>(mon_Url, departement);
  }

  deleteDepartement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

 
}
