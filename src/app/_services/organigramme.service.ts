import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class OrganigrammeService {
  private apiUrl = 'http://localhost:8008/directions'; 

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({
    "Content-Type": "application/json", // Adjust this based on your server requirements
    // Add any additional headers as needed
  });

  // Configure the HTTP options with headers
  httpOptions = {
    headers: this.headers,
  };


  getAllDirections(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
  createDirection(direction: any): Observable<any> {
    return this.http.post(this.apiUrl, direction,this.httpOptions);
  }

 

  updateDirection(direction: any): Observable<any> {
    const mon_Url = `${this.apiUrl}/${direction.id}`;
    return this.http.put<any>(mon_Url, direction);
  }

  deleteDirection(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
