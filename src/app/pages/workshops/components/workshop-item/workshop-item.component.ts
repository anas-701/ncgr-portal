import { Component, Input } from '@angular/core';
import { WorkshopDTO } from '../../model/workshop.interface';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-workshop-item',
  imports: [
    RouterLink
  ],
  templateUrl: './workshop-item.component.html',
  styleUrl: './workshop-item.component.scss'
})
export class WorkshopItemComponent {
  @Input() workshop!: WorkshopDTO;
}
