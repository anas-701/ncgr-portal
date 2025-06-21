import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { GetCurrentRoleDetailsDto, GetCurrentRoleListDto, GetUserLoginDto, LoginDto } from '../../@models/account.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serviceUrl: string = `${environment.baseApiUrl}/account`;

  constructor(public httpClient: HttpClient, private router: Router) {
  }


  login = (input: LoginDto): Observable<GetUserLoginDto> => {
    return this.httpClient.post<GetUserLoginDto>(`${this.serviceUrl}/login`, input).pipe();
  }
  
  logOut = (url?: string): void => {
    localStorage.removeItem('access_token');
    if (url) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  
  geteCurrentRoles = (): Observable<GetCurrentRoleListDto[]> => {
    return this.httpClient.get<GetCurrentRoleListDto[]>(`${this.serviceUrl}/get-current-roles`).pipe();
  }

  geteCurrentRole = (): Observable<GetCurrentRoleDetailsDto> => {
    return this.httpClient.get<GetCurrentRoleDetailsDto>(`${this.serviceUrl}/get-current-role`).pipe();
  }
  
  changeCurrentRole = (roleId: string): Observable<GetCurrentRoleDetailsDto> => {
    return this.httpClient.get<GetCurrentRoleDetailsDto>(`${this.serviceUrl}/change-current-role/${roleId}`).pipe();
  }

}
