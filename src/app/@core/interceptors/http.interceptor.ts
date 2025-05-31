import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  let modifiedReq = req.clone();
  const token = localStorage.getItem('access_token');
  const lang = localStorage.getItem('lang') || 'en'; 
  if (token) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        lang  : lang, 
      }
    });
  }

  return next(modifiedReq).pipe(
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