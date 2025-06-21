import { Component } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workshop-content',
  imports: [
    SideBarComponent,
    RouterLink
  ],
  templateUrl: './workshop-content.component.html',
  styleUrl: './workshop-content.component.scss'
})
export class WorkshopContentComponent {
  isLoading!:boolean;
}
