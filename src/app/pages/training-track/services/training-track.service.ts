import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { TrackCreateRequest } from '../model/track-create-request';
import {
  OrderByValue,
  ProgramPathsRequest,
  ProgramPathsResponse,
} from '../model/program-paths-response.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingTrackService extends BaseService {
  private readonly baseUrl = environment.apiUrl;

  getAllTracks(
    pageNumber: number = 1,
    pageSize: number = 10,
    lang: string = 'ar'
  ): Observable<ProgramPathsResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      lang: lang,
    });

    const body = {
      pageNumber,
      pageSize,
    };

    return this.post<ProgramPathsResponse>(
      `${this.baseUrl}v1/ProgramePaths/GetAll`,
      body,
      {
        headers,
      }
    );
  }

  getAllTracksWithFilter(
    pageNumber: number = 1,
    pageSize: number = 10,
    statusId: number = 0,
    lang: string = 'ar',
    searchText: string = '',
    orderBy: OrderByValue[] = []
  ): Observable<ProgramPathsResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      lang: lang,
    });

    const body: ProgramPathsRequest = {
      pageNumber,
      pageSize,
      filter: {
        statusId,
        searchText: searchText || undefined,
      },
    };

    // Add order by if provided
    if (orderBy && orderBy.length > 0) {
      body.orderByValue = orderBy;
    }

    return this.post<ProgramPathsResponse>(
      `${this.baseUrl}v1/ProgramePaths/GetAll`,
      body,
      {
        headers,
      }
    );
  }

  getTrackById(id: string, lang: string = 'ar'): Observable<any> {
    const headers = new HttpHeaders({
      lang: lang,
    });

    return this.get(
      `${this.baseUrl}v1/ProgramePaths/GetPathDetailsWithTrainingProgram?Pathid=${id}`,
      {
        headers,
      }
    );
  }

  createTrack(track: TrackCreateRequest, lang: string = 'ar'): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      lang: lang,
    });

    console.log('Creating track at:', `${this.baseUrl}v1/ProgramePaths/Create`);
    console.log('Request payload:', track);

    return this.post(`${this.baseUrl}v1/ProgramePaths/Create`, track, {
      headers,
    });
  }

  updateTrack(track: TrackCreateRequest, lang: string = 'ar'): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      lang: lang,
    });

    console.log('Updating track at:', `${this.baseUrl}v1/ProgramePaths/Update`);
    console.log('Update payload:', track);

    return this.post(`${this.baseUrl}v1/ProgramePaths/Update`, track, {
      headers,
    });
  }

  updateTrackStatus(
    id: number,
    statusId: number,
    lang: string = 'ar'
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      lang: lang,
    });

    console.log(
      'Updating track status at:',
      `${this.baseUrl}v1/ProgramePaths/UpdateStatus?Id=${id}&StatusId=${statusId}`
    );

    return this.get(
      `${this.baseUrl}v1/ProgramePaths/UpdateStatus?Id=${id}&StatusId=${statusId}`,
      {
        headers,
      }
    );
  }

  deleteTrack(id: number, lang: string = 'ar'): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      lang: lang,
    });

    console.log(
      'Deleting track at:',
      `${this.baseUrl}v1/ProgramePaths/delete?id=${id}`
    );

    return this.post(
      `${this.baseUrl}v1/ProgramePaths/delete?id=${id}`,
      {},
      {
        headers,
      }
    );
  }
}
