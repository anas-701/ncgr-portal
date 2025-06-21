import { Component } from '@angular/core';
import { SideBarComponent } from "../../../side-bar/side-bar.component";

@Component({
  selector: 'app-content',
  imports: [SideBarComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

}
