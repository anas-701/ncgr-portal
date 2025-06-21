import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Role } from '../../../../@core/enums/role.enum';
import { Subscription } from 'rxjs';
import { ChangeCacheDataService } from '../../../../@core/services/shared/change-cache-data.service';
import { CommonModule } from '@angular/common';
import { SideBarItem } from '../../../../@models/side-bar-item.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent  implements OnInit, OnDestroy{
  subscription!: Subscription;
  currentRoleId?: string;
  sidebarItems = [] as SideBarItem[];
  isSidebarCollapsed = false;

  admin: string = Role.Admin;
  educationalContentCreator: string = Role.EducationalContentCreator;
  digitalContentCreator: string = Role.DigitalContentCreator;
  approved: string = Role.Approved;
  trainee: string = Role.Trainee;
  trainer: string = Role.Trainer;

  constructor(
    private changeCacheDataService: ChangeCacheDataService) {
    
  }
  
  ngOnInit(): void {

    this.subscription = this.changeCacheDataService.getCurrentUserInfo().subscribe((data) => {
      this.currentRoleId = data?.currentRole;
      this.getSideBar();

      this.sidebarItems.forEach(item => {
        item.collapsed = true;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  isEnabled(roles?: string[]) {
    let isValid = false;
    if (this.currentRoleId) {
      isValid = true;
      if (roles) {
        return roles?.includes(this.currentRoleId)
      }
    }
    return isValid;
  }

  toggleCollapse(item: SideBarItem) {
    item.collapsed = !item.collapsed;
  }


  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    document.querySelector('.sidebar')?.classList.toggle('collapsed');
  }

  getSideBar() {
    this.sidebarItems = [
      {
        label: 'المسارات التدريبية',
        icon: '01.svg',
        route: '/training-paths',
        isEnabled: this.isEnabled([this.admin])
      },
      {
        label: 'البرامج التدريبية',
        icon: '02.svg',
        route: '/dashboard',
        isEnabled: this.isEnabled([this.admin, this.educationalContentCreator, this.approved])
      },
      {
        label: 'الورش التدريبية',
        icon: '03.svg',
        route: '/workshops',
        isEnabled: this.isEnabled([this.admin, this.educationalContentCreator, this.approved])
      },
      {
        label: 'البرامج العامة',
        icon: '04.svg',
        route: '/public-programs',
        isEnabled: this.isEnabled([this.admin, this.educationalContentCreator, this.approved])
      },
      {
        label: 'التقييمات',
        icon: '05.svg',
        route: '/evaluations',
        isEnabled: this.isEnabled([this.admin])
      },
      {
        label: 'الشهادات',
        icon: '06.svg',
        route: '/certificates',
        isEnabled: this.isEnabled([this.admin])
      },
      {
        label: 'الوسوم',
        icon: '07.svg',
        route: '/tags',
        isEnabled: this.isEnabled([this.admin])
      },
      {
        label: 'مركز الوسائط',
        icon: '08.svg',
        route: '/media-center',
        isEnabled: this.isEnabled([this.admin, this.digitalContentCreator])
      },
      {
        label: 'التقارير',
        icon: '09.svg',
        route: '/reports',
        isEnabled: this.isEnabled([this.admin])
      },
      {
        label: 'قائمة المستخدمين',
        icon: '10.svg',
        route: '/users',
        isEnabled: this.isEnabled([this.admin])
      },
      {
        label: 'ادارة صفحات المحتوي',
        icon: '11.svg',
        isEnabled: this.isEnabled([this.admin, this.digitalContentCreator]),
        children: [
          {
            label: 'الصفحة الرئيسية',
            route: '/home',
            isEnabled: this.isEnabled([this.admin, this.digitalContentCreator])
          },
          // {
          //   label: 'عن الاكاديمية',
          //   route: '/about-academy',
          //   isEnabled: this.isEnabled([this.admin, this.digitalContentCreator])
          // },
          {
            label: 'عن المنصة',
            route: '/admin/aboutAcademy',
            isEnabled: this.isEnabled([this.admin, this.digitalContentCreator])
          },
          {
            label: 'القسم الترحيبي',
            route: '/welcome',
            isEnabled: this.isEnabled([this.admin, this.digitalContentCreator])
          },
          {
            label: 'الأخبار',
            route: '/news',
            isEnabled: this.isEnabled([this.admin, this.digitalContentCreator])
          },
          {
            label: 'القسم الرئيسي',
            route: '/main-section',
            isEnabled: this.isEnabled([this.admin, this.digitalContentCreator])
          },
          {
            label: 'الإحصائيات',
            route: '/stats',
            isEnabled: this.isEnabled([this.admin, this.digitalContentCreator])
          },
          {
            label: 'الجهات الأكثر تفاعلًا',
            route: '/top-agencies',
            isEnabled: this.isEnabled([this.admin, this.digitalContentCreator])
          }
        ],
      },
    ];


    this.sidebarItems.forEach(item => {
      item.children = item.children?.filter(c => c.isEnabled) || [];
    });

  }
}
