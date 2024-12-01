import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { Router } from '@angular/router';

const { apiUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const API = '/api'
  if(req.url.startsWith('/api')){
    req = req.clone({
      url: req.url.replace(API,apiUrl),
      withCredentials : true
    })
  }

  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((err)=>{
      if(err.status === 401){
        // navigate to login
        router.navigate(['/login']);
      } else {
        // errorService.set
        errorMsgService.setErrot(err);
        router.navigate(['/error']);
      }

      //catchError returns array of errors
      return [err];
    })
  );
};
