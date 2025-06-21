import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { GetEvaluationParamsDto } from '../models/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  serviceUrl: string = `${environment.baseApiUrl}/evaluation`;

  constructor(public httpClient: HttpClient) { 

  }

  getAll = (input: GetEvaluationParamsDto): Observable<any> => {
    return this.httpClient.post<any>(`${this.serviceUrl}/get-all`, input).pipe();
  }

}
