import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : UserForAuth | null = null;
  USER_KEY = '[user]'  

  get isLogged(): boolean {
    return !!this.user;
  }
  constructor() {

    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = null;
    }
  }

  login(){
    this.user = {
      firstName: 'John',
      email: 'john.doe@abv.bg',
      phoneNumber: '123-123-123',
      password: '123123',
      id: 'asdasdasd'
    }
    
    localStorage.setItem(this.USER_KEY,JSON.stringify(this.user))
  }

  logout(){
    this.user = null;
    localStorage.removeItem(this.USER_KEY)
  }
  

}

