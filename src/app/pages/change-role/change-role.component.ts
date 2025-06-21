import { Component } from '@angular/core';
import { AccountService } from '../../@core/services/account.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetCurrentRoleDetailsDto, GetCurrentRoleListDto } from '../../@models/account.model';
import { CommonModule } from '@angular/common';
import { ChangeCacheDataService } from '../../@core/services/shared/change-cache-data.service';

@Component({
  selector: 'app-change-role',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './change-role.component.html',
  styleUrl: './change-role.component.scss'
})
export class ChangeRoleComponent {
  returnUrl!: string;
  currentRoles = [] as GetCurrentRoleListDto[];

  constructor(private accountService: AccountService, private changeCacheDataService: ChangeCacheDataService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    this.getDetails();
  }

  getDetails() {
    this.accountService.geteCurrentRoles().subscribe((response) => {
      this.currentRoles = response;
    });
  }

  changeCurrentRole(roleId: string) {
    this.accountService.changeCurrentRole(roleId).subscribe((response) => {
      if (response) {
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
        else {
          this.router.navigate(['/control-panel']);
        }
      }
      this.changeCacheDataService.setCurrentUserInfo(response);
    });
  }
}
