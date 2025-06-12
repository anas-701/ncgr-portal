import { Injectable } from '@angular/core';
import { BaseService } from '../../../@core/services/base.service';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService extends BaseService{
  private readonly baseUrl = environment.apiUrl + 'v1/Workshop';

  createWorkshop(formData: FormData): Observable<any> {
    return this.postFormData(`${this.baseUrl}/Create`, formData);
  }

  updateWorkshop(formData: FormData): Observable<any> {
    return this.postFormData(`${this.baseUrl}/Update`, formData);
  }

  updateWorkshopStatus(id: number, statusId: number): Observable<any> {
    return this.get(`${this.baseUrl}/UpdateStatus?Id=${id}&StatusId=${statusId}`);
  }

  getAllWorkshops(filter: any): Observable<any> {
    return this.post(`${this.baseUrl}/GetAll`, filter);
  }

  getWorkshopById(id: number): Observable<any> {
    return this.get(`${this.baseUrl}/getById?id=${id}`);
  }

  deleteWorkshop(id: number): Observable<any> {
    return this.postDelete(`${this.baseUrl}/delete?id=${id}`);
  }

  deleteWorkshopList(ids: number[]): Observable<any> {
    return this.post(`${this.baseUrl}/DeleteList`, ids);
  }
}
