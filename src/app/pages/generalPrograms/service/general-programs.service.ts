import { Injectable } from '@angular/core';
import { BaseService } from '../../../@core/services/base.service';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralProgramsService extends BaseService {
  private readonly baseUrl = environment.apiUrl + 'v1/PublicPrograms';
  private readonly departmentsUrl =
    environment.apiUrl + 'v1/TrainingProgramDepartments';

  createGeneralProgram(formData: FormData): Observable<any> {
    return this.postFormData(`${this.baseUrl}/Create`, formData);
  }
  updateGeneralProgram(id: string, formData: FormData): Observable<any> {
    return this.postFormData(`${this.baseUrl}/Update`, formData);
  }
  updateGeneralProgramStatus(id: string, statusId: number): Observable<any> {
    return this.get(`${this.baseUrl}/UpdateStatus?Id=${id}&StatusId=${statusId}`);
  }
  getAllGeneralPrograms(body: any): Observable<any> {
    return this.post(`${this.baseUrl}/GetAll`, body);
  }
  getGeneralProgramById(id: string): Observable<any> {
    return this.get(`${this.baseUrl}/getById?id=${id}`);
  }
  deleteGeneralProgram(id: string): Observable<any> {
    return this.postDelete(`${this.baseUrl}/delete?id=${id}`);
  }
  deleteGeneralProgramList(id: string): Observable<any> {
    return this.delete(`${this.baseUrl}/DeleteList/${id}`);
  }

}
