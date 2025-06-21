import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../../../@core/services/account.service';
import { GetCurrentRoleDetailsDto } from '../../../../@models/account.model';
import { Subscription } from 'rxjs';
import { ChangeCacheDataService } from '../../../../@core/services/shared/change-cache-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy{
  subscription!: Subscription;
  isAuthenticated: boolean = false;
  userInfo: GetCurrentRoleDetailsDto|null  = {} as GetCurrentRoleDetailsDto;
  classToggled = false;
  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 50;
  }
  public toggleField() {
    this.classToggled = !this.classToggled;
  }

  constructor(private accountService: AccountService,
    private changeCacheDataService: ChangeCacheDataService) {
    
    }

  ngOnInit(): void {
      this.subscription = this.changeCacheDataService.getCurrentUserInfo().subscribe((data) => {
        this.userInfo = data;
        if(data){
          this.isAuthenticated = this.isUserAuthenticate();
        }
      });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  
  isUserAuthenticate(): boolean {
    if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {
      return false;
    }
    else {
      return true;
    }
  }
  
  logOut() {
    this.accountService.logOut();
    this.changeCacheDataService.setCurrentUserInfo(null);
    this.isAuthenticated = false;
  }

}
