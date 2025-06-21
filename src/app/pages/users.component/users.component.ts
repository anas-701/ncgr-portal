import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-users.component',
  imports: [SideBarComponent,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
paths :any[] = [];
category :any[] = [];
}
