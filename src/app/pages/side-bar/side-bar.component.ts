import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  children?: { label: string; route: string }[];
}
@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    document.querySelector('.sidebar')?.classList.toggle('collapsed');
  }

  sidebarItems: SidebarItem[] = [
    { label: 'المسارات التدريبية', icon: '01.svg', route: '/training-paths' },
    { label: 'البرامج التدريبية', icon: '02.svg', route: '/dashboard' },
    { label: 'الورش التدريبية', icon: '03.svg', route: '/workshops' },
    { label: 'البرامج العامة', icon: '04.svg', route: '/public-programs' },
    { label: 'التقييمات', icon: '05.svg', route: '/evaluations' },
    { label: 'الشهادات', icon: '06.svg', route: '/certificates' },
    { label: 'الوسوم', icon: '07.svg', route: '/tags' },
    { label: 'مركز الوسائط', icon: '08.svg', route: '/media-center' },
    { label: 'التقارير', icon: '09.svg', route: '/reports' },
    { label: 'قائمة المستخدمين', icon: '10.svg', route: '/users' },
    {
      label: 'ادارة صفحات المحتوي',
      icon: '11.svg',
      children: [
        { label: 'الصفحة الرئيسية', route: '/home' },
        { label: 'عن الاكاديمية', route: '/about-academy' },
        { label: 'عن المنصة', route: '/about' },
        { label: 'القسم الترحيبي', route: '/welcome' },
        { label: 'الأخبار', route: '/news' },
        { label: 'القسم الرئيسي', route: '/main-section' },
        { label: 'الإحصائيات', route: '/stats' },
        { label: 'الجهات الأكثر تفاعلًا', route: '/top-agencies' },
      ],
    },
  ];
}
