import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/dashboard-layout/compnents/sidebar/sidebar.component';

@Component({
  selector: 'app-control-panel',
  imports: [SidebarComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

}
