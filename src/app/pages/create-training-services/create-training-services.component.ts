import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { WorkshopsCardComponent } from '../workshops-card/workshops-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-training-services',
  imports: [CommonModule,SideBarComponent,SearchFilterComponent,WorkshopsCardComponent],
  templateUrl: './create-training-services.component.html',
  styleUrl: './create-training-services.component.scss'
})
export class CreateTrainingServicesComponent {

}
