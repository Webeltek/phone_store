import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, of, Subscription, tap } from 'rxjs';

export type RegUser = {username:string, email: string, password: string }

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  public user$ = this.user$$.asObservable();

  USER_KEY = '[user]'  
  user : UserForAuth | null = null;
  userSubscription : Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  
  constructor(private http: HttpClient) {
    this.userSubscription =  this.user$.subscribe((user)=>{
      this.user = user;
    })
  }

  setSessUser(user: UserForAuth){
    const { _id, username } = user
    sessionStorage.setItem(this.USER_KEY,JSON.stringify({ _id, username }))
  }

  getSessUser(){
    return JSON.parse(sessionStorage.getItem(this.USER_KEY) || '')
  }

  clearSessUser(){
    sessionStorage.removeItem(this.USER_KEY);
  }

  login(email: string, password: string){

    return this.http.post<UserForAuth>('/api/login', { email, password})
    .pipe(tap((user)=>{
      this.setSessUser(user)
      this.user$$.next(user)}))
    
  }

  logout(){
    
    return this.http.post('/api/logout',{})
    .pipe(tap((user)=> {
      this.clearSessUser()
      this.user$$.next(null)
    }
    ))
  }

  register(username: string, email: string, password: string, rePassword:string){
    return this.http.post<UserForAuth>('/api/register', {
      username, 
      email, 
      password, 
      rePassword})
    .pipe(tap((user)=> {
      this.setSessUser(user)
      this.user$$.next(user)
    }))
  }

  updateProfile(username: string, email:string){
    return this.http.put<UserForAuth>('/api/users/profile',{
      username,
      email
    })
    .pipe(tap((user)=> this.user$$.next(user)))
  }

  getProfile(){
    return this.http.get<UserForAuth>('/api/users/profile')
    .pipe(
      tap((user)=> {
          if(user){
            this.setSessUser(user);
          } else {
            this.clearSessUser()
          }
          this.user$$.next(user)
        }
      ))
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
  

}

