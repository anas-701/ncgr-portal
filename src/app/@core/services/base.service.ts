import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(protected http: HttpClient) {}

  protected get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params });
  }
  protected postDelete<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.post<T>(url, { params });
  }
  protected post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
  protected postFormData<T>(url: string, formData: FormData): Observable<T> {
    return this.http.post<T>(url, formData);
  }

  protected put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

  protected patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(url, body);
  }
}
