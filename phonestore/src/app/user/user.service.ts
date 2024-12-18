import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, Subscription, tap, throwError } from 'rxjs';

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

  

  login(email: string, password: string){

    return this.http.post<UserForAuth>('/api/login', { email, password})
    .pipe(tap((user)=>{
      this.user$$.next(user)}))
    
  }

  logout(){
    
    return this.http.post('/api/logout',{})
    .pipe(tap((user)=> {
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
          this.user$$.next(user)
        }
      ))
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
  

}

