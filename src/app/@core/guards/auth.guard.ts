import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, Observable, Subscription, take } from 'rxjs';
import { ChangeCacheDataService } from '../services/shared/change-cache-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  subscription!: Subscription;
  currentRoleId?: string;
  constructor(private router: Router, private accountService: AccountService,
    private changeCacheDataService: ChangeCacheDataService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.accountService.logOut(state.url);
      return false;
    }
  
    return this.changeCacheDataService.getCurrentUserInfo().pipe(
      take(1),
      map(response => {
        console.log('Got role info in guard:', response);
        this.currentRoleId = response?.currentRole;
  
        const expectedRoles = next.data['expectedRoles'];
  
        if (!expectedRoles || expectedRoles.length === 0) {
          return true;
        }
  
        const canAccess = expectedRoles.includes(this.currentRoleId);
        if (!canAccess) {
          this.router.navigate(['/not-authorize']);
        }
  
        return canAccess;
      })
    );
  }
  

}