import { Component, Input } from '@angular/core';
import { Tab } from './interface/tab.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-tabs',
  imports: [CommonModule],
  templateUrl: './shared-tabs.component.html',
  styleUrl: './shared-tabs.component.scss'
})
export class SharedTabsComponent {
  @Input() tabs:Tab[]=[];
  @Input() currentTab:number=0;
}
