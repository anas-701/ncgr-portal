import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class AppLookUpServiceService extends BaseService {
  private readonly baseUrl = environment.apiUrl + 'AppLookUp';

  getAllCategories(): Observable<any> {
    return this.get(`${this.baseUrl}/CategorysGetAllToDrop`);
  }
  getAllLanguages(): Observable<any> {
    return this.get(`${this.baseUrl}/LanguagesGetAllToDrop`);
  }
  getAllTypes(): Observable<any> {
    return this.get(`${this.baseUrl}/ProgramTypesGetAllToDrop`);
  }
  getAllCosts(): Observable<any> {
    return this.get(`${this.baseUrl}/ProgramCostGetAllToDrop`);
  }
  getAllCertificates(): Observable<any> {
    return this.get(`${this.baseUrl}/CertificatesGetAllToDrop`);
  }
  getAllProgramStatus(): Observable<any> {
    return this.get(`${this.baseUrl}/ProgramStatusGetAllToDrop`);
  }
  getAllPaths(): Observable<any> {
    return this.get(`${this.baseUrl}/ProgramePathsGetAllToDrop`);
  }
  getAllStatus(): Observable<any> {
    return this.get(`${this.baseUrl}/StatusGetAllToDrop`);
  }
  getAllTrainers(): Observable<any> {
    return this.get(`${this.baseUrl}/TrainerTypeGetAllToDrop`);
  }
  getAllTags(): Observable<any> {
    return this.get(`${this.baseUrl}/TagsGetAllToDrop`);
  }
}
