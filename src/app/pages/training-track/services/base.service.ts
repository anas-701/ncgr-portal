import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(protected http: HttpClient) {}

  protected get<T>(url: string, options?: any): Observable<T> {
    console.log('GET request to:', url);
    return this.http.get<T>(url, options) as Observable<T>;
  }

  protected post<T>(url: string, body: any, options?: any): Observable<T> {
    console.log('POST request to:', url);
    console.log('Request payload:', body);
    return this.http.post<T>(url, body, options) as Observable<T>;
  }

  protected put<T>(url: string, body: any, options?: any): Observable<T> {
    console.log('PUT request to:', url);
    console.log('Request payload:', body);
    return this.http.put<T>(url, body, options) as Observable<T>;
  }

  protected delete<T>(url: string, options?: any): Observable<T> {
    console.log('DELETE request to:', url);
    return this.http.delete<T>(url, options) as Observable<T>;
  }

  protected postFormData<T>(
    url: string,
    formData: FormData,
    options?: any
  ): Observable<T> {
    console.log('POST FormData request to:', url);
    return this.http.post<T>(url, formData, options) as Observable<T>;
  }

  protected putFormData<T>(
    url: string,
    formData: FormData,
    options?: any
  ): Observable<T> {
    console.log('PUT FormData request to:', url);
    return this.http.put<T>(url, formData, options) as Observable<T>;
  }
}
