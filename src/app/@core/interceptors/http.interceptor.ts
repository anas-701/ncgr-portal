import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { ProgressSpinnerService } from '../services/shared/progress-spinner.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const progressSpinner = inject(ProgressSpinnerService);
  
  progressSpinner.show();

  let myRequest = req.clone();
  const token = localStorage.getItem('access_token');
  const lang = localStorage.getItem('lang') || 'ar'; 
  if (token) {
    myRequest = myRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': lang, 
        'Accept': 'application/json'
      }
    });
  }

  return next(myRequest).pipe(
    finalize(() => {
        progressSpinner.hide();
    }),
    catchError((error) => {
      if (error.status === 401) {
        router.navigate(['login']);
      } else if (error.status === 403) {
        router.navigate(['forbidden']);
      }
      return throwError(() => error);
    })
  );
};