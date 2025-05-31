import { Injectable } from '@angular/core';
import { BaseService } from '../../../@core/services/base.service';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environment/environment';

export interface Section {
  id: number;
  arabicTitle: string;
  englishTitle: string;
}
@Injectable({
  providedIn: 'root',
})
export class SectionsService extends BaseService {
  private readonly baseUrl = environment.apiUrl + 'v1/';

  addSection(body: any): Observable<any> {
    return this.post(`${this.baseUrl}TrainingProgramDepartments/Create`, body);
  }
  updateSection(body: any): Observable<any> {
    return this.post(`${this.baseUrl}TrainingProgramDepartments/Update`, body);
  }

  getSections(body: any): Observable<any> {
    return this.post(`${this.baseUrl}TrainingProgramDepartments/GetAll`, body);
  }
  deleteSection(id: number): Observable<any> {
    return this.postDelete(
      `${this.baseUrl}TrainingProgramDepartments/delete?id=${id}`
    );
  }
  addQuestion(body: any): Observable<any> {
    return this.post(
      `${this.baseUrl}TrainingProgramContentExameDetails/Create`,
      body
    );
  }
  updateQuestion(body: any): Observable<any> {
    return this.post(
      `${this.baseUrl}TrainingProgramContentExameDetails/Update`,
      body
    );
  }
  deleteQuestion(id: number): Observable<any> {
    return this.postDelete(
      `${this.baseUrl}TrainingProgramContentExameDetails/delete?id=${id}`
    );
  }
  createLecture(formData: FormData): Observable<any> {
    return this.postFormData(
      `${this.baseUrl}TrainingProgramContentDetails/Create`,
      formData
    );
  }
  updateLecture(formData: FormData): Observable<any> {
    return this.postFormData(
      `${this.baseUrl}TrainingProgramContentDetails/Update`,
      formData
    );
  }
  deleteLecture(id: number): Observable<any> {
    return this.postDelete(
      `${this.baseUrl}TrainingProgramContentDetails/delete?id=${id}`
    );
  }
  getLectureById(id: number): Observable<any> {
    return this.get(
      `${this.baseUrl}TrainingProgramContentDetails/getById?id=${id}`
    );
  }
  getLectureQuestions(body: any): Observable<any> {
    return this.post(
      `${this.baseUrl}TrainingProgramContentExameDetails/GetAll`,
      body
    );
  }
}
