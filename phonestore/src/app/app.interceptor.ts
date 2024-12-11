import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, EMPTY, of, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';

const { apiUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log({apiUrl});
  
  const API = '/api'
  if(req.url.startsWith('/api')){
    req = req.clone({
      url: req.url.replace(API,apiUrl),
      withCredentials : true
    })
  }

  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);
  const userService = inject(UserService);
  
  return next(req).pipe(
    catchError((err)=>{

      if(err.status === 401 && userService.isLogged){
        // navigate to login
        router.navigate(['/login']);
      } else if (
          (err.status === 401 ||  err.status === 409) && !userService.isLogged ) {
        errorMsgService.setError(err);
      } else {
        // errorService.set
        errorMsgService.setError(err);
        router.navigate(['/error']);

      }
      
      //catchError returns array of errors
      return throwError(()=> err);
    })
  );
};
