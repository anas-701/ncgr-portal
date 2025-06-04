import { Component } from '@angular/core';
import { SharedTabsComponent } from '../../../@shared/shared-tabs/shared-tabs.component';
import { Tab } from '../../../@shared/shared-tabs/interface/tab.interface';
import { WorkshopDetailsAboutComponent } from './components/workshop-details-about/workshop-details-about.component';
import { WorkshopDetailsImportantDatesComponent } from './components/workshop-details-important-dates/workshop-details-important-dates.component';
import { WorkshopDetailsWorkshopSessionsComponent } from './components/workshop-details-workshop-sessions/workshop-details-workshop-sessions.component';
import { WorkshopDetailsRatesComponent } from './components/workshop-details-rates/workshop-details-rates.component';
import { WorkshopDetailsTimerComponent } from './components/workshop-details-timer/workshop-details-timer.component';
import { SharedRateComponent } from '../../../@shared/shared-rate/shared-rate.component';

@Component({
  selector: 'app-workshop-details',
  imports: [
    SharedTabsComponent,
    WorkshopDetailsTimerComponent,
    SharedRateComponent
  ],
  templateUrl: './workshop-details.component.html',
  styleUrl: './workshop-details.component.scss'
})
export class WorkshopDetailsComponent {
  currentTab:number=0;
  tabs:Tab[]=[
    {
      label:'عن الورشة',
      id:'about',
      component:WorkshopDetailsAboutComponent
    },
    {
      label:'مواعيد مهمة',
      id:'important-dates',
      component:WorkshopDetailsImportantDatesComponent
    },
    {
      label:'جلسات الورشة',
      id:'workshop-sessions',
      component:WorkshopDetailsWorkshopSessionsComponent
    },
    {
      label:'التقييمات',
      id:'rates',
      component:WorkshopDetailsRatesComponent
    },
  ]
}
