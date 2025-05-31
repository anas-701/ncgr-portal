// src/app/features/training/services/training-programs.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingProgramsService extends BaseService {
  private readonly baseUrl = environment.apiUrl + 'v1/TrainingProgram';
  private readonly departmentsUrl =
    environment.apiUrl + 'v1/TrainingProgramDepartments';

  createTrainingProgram(formData: FormData): Observable<any> {
    return this.postFormData(`${this.baseUrl}/Create`, formData);
  }
  updateTrainingProgram(id: string, formData: FormData): Observable<any> {
    return this.postFormData(`${this.baseUrl}/Update`, formData);
  }
  updateTrainingProgramStatus(id: string, statusId: number): Observable<any> {
    // const formData = new FormData();
    // formData.append('ProgramStatusId', statusId.toString());
    return this.get(`${this.baseUrl}/UpdateStatus?Id=${id}&StatusId=${statusId}`);
  }
  getAllTrainingPrograms(body: any): Observable<any> {
    return this.post(`${this.baseUrl}/GetAll`, body);
  }
  getTrainingProgramById(id: string): Observable<any> {
    return this.get(`${this.baseUrl}/getById?id=${id}`);
  }
  deleteTrainingProgram(id: string): Observable<any> {
    return this.postDelete(`${this.baseUrl}/delete?id=${id}`);
  }
  deleteTrainingProgramList(id: string): Observable<any> {
    return this.delete(`${this.baseUrl}/DeleteList/${id}`);
  }

  // Get program departments with lectures
  getProgramDepartments(
    programId: number,
    pageNumber: number = 1,
    pageSize: number = 50
  ): Observable<any> {
    const body = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filter: {
        trainingProgramId: programId,
      },
    };
    return this.post(`${this.departmentsUrl}/GetAll`, body);
  }
}
