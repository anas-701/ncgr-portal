import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { WorkshopItemComponent } from './components/workshop-item/workshop-item.component';
import { WorkshopDTO } from './model/workshop.interface';
import { workshops } from './workshop.fake';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-workshops',
  imports: [
    SideBarComponent,
    WorkshopItemComponent,
    RouterLink
  ],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.scss'
})
export class WorkshopsComponent {
  workshops: WorkshopDTO[] = workshops;  
}
