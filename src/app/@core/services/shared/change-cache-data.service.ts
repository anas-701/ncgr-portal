import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of, take, tap, throwError } from 'rxjs';
import { GetCurrentRoleDetailsDto } from '../../../@models/account.model';
import { AccountService } from '../account.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChangeCacheDataService {
  getCurrentRoleDetails!: GetCurrentRoleDetailsDto;
  private dataSubject = new BehaviorSubject<GetCurrentRoleDetailsDto | null>(this.getCurrentRoleDetails);


  constructor(private accountService: AccountService) {
    this.dataSubject.subscribe(value => console.log('Subscriber A:', value))
  }


  getCurrentUserInfo(): Observable<GetCurrentRoleDetailsDto> {
    const cached = this.dataSubject.getValue();
  
    if (cached) {
      return of(cached); // return immediately if cached
    }
  
    const token = localStorage.getItem('access_token');
    if (!token) {
      return throwError(() => new Error('Token not found'));
    }
  
    // Fetch from API and emit once
    return this.accountService.geteCurrentRole().pipe(
      tap((response) => {
        console.log('Fetched from API:', response);
        this.dataSubject.next(response);
      })
    );
  }
  

  setCurrentUserInfo(currentRole: GetCurrentRoleDetailsDto | null): void {
    this.dataSubject.next(currentRole);
  }

}
