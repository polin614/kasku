import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://675bbdc69ce247eb19373c51.mockapi.io/bansos/polin'; 
  private polinDataSubject = new BehaviorSubject<any[]>([]);  
  public polinData$ = this.polinDataSubject.asObservable(); 

  constructor(private http: HttpClient) { }


  getPendaftar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => {
        this.polinDataSubject.next(data);
      })
    );
  }

  
  addpolinData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      tap(() => {
        this.getPendaftar().subscribe();
      })
    );
  }
}
