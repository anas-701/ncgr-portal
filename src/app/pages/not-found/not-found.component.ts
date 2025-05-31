import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/dashboard-layout/compnents/footer/footer.component';
import { HeaderComponent } from '../../layout/dashboard-layout/compnents/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
