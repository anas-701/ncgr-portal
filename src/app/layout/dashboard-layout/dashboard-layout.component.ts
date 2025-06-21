import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './compnents/header/header.component';
import { NavbarComponent } from './compnents/navbar/navbar.component';
import { FooterComponent } from './compnents/footer/footer.component';
import { SidebarComponent } from './compnents/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet,
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit{

  excludedRoutes = ['/login', '/change-role'];

  constructor(public router: Router){}
  
  ngOnInit(): void {
  }

  get shouldShowSidebar(): boolean {
    return !this.excludedRoutes.includes(this.router.url);
  }
}
