import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, tap } from 'rxjs';

export type RegUser = {username:string, email: string, password: string }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user : UserForAuth | null = null;
  USER_KEY = '[user]'  

  get isLogged(): boolean {
    return !!this.user;
  }
  constructor(private http: HttpClient) {

    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = null;
    }
  }

  login(email: string, password: string){
    // this.user = {
    //   username: 'john',
    //   email: 'john.doe@abv.bg',
    //   password: '123123',
    //   id: 'asdasdasd'
    // }
    // localStorage.setItem(this.USER_KEY,JSON.stringify(this.user))

    return this.http.post<UserForAuth>('/api/login', { email, password})
    .pipe(tap((user)=> this.user$$.next(user)))
    
  }

  logout(){
    this.user = null;
    localStorage.removeItem(this.USER_KEY)
  }

  register(username: string, email: string, password: string, rePassword:string){
    return this.http.post<UserForAuth>('/api/register', {
      username, 
      email, 
      password, 
      rePassword})
    .pipe(tap((user)=> this.user$$.next(user)))
  }
  

}

