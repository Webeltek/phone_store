import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';

const { apiUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const API = '/api'
  if(req.url.startsWith('/api')){
    req = req.clone({
      url: req.url.replace(API,apiUrl),
      withCredentials : true
    })
  }
  
  return next(req);
};
