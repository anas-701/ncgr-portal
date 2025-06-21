import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccountService } from '../../@core/services/account.service';
import { GetCurrentRoleDetailsDto, LoginDto } from '../../@models/account.model';
import { CommonModule } from '@angular/common';
import { ChangeCacheDataService } from '../../@core/services/shared/change-cache-data.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginDto: LoginDto = {} as LoginDto;
  isFormSubmitted: boolean = false;
  returnUrl!: string;

  constructor(private accountService: AccountService, private changeCacheDataService: ChangeCacheDataService,
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      userName: [this.loginDto.userName || '', [Validators.required]],
      password: [this.loginDto.password || '', [Validators.required]]
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm?.valid) {
      this.loginDto = { ...this.loginForm.value } as LoginDto;
      this.accountService.login(this.loginDto).subscribe(response => {
        if (response != null) {
          localStorage.setItem('access_token', response.token);

          let cachedData = {
            shortNameAr: response.shortNameAr,
            shortNameEn: response.shortNameEn,
            gender: response.gender,
            currentRole: response.currentRole,
            currentRoleNameAr: response.currentRoleNameAr,
            currentRoleNameEn: response.currentRoleNameEn,
            roleCount: response.roleCount
          } as GetCurrentRoleDetailsDto;

          this.changeCacheDataService.setCurrentUserInfo(cachedData);
          if (response.roleCount > 1) {
            if (this.returnUrl) {
              this.router.navigate(['/change-role', { returnUrl: this.returnUrl }]);
            }
            else {
              this.router.navigate(['/change-role']);
            }
          }
          else {
            if (this.returnUrl) {
              this.router.navigateByUrl(this.returnUrl);
            } else {
              this.router.navigate(['/control-panel']);
            }
          }
        }
      });
    }
  }

}
