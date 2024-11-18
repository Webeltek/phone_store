import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Phone } from './types/phone';
import { Message } from './types/message';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPhones(limit?: Number){
    const { apiUrl} = environment;
    let url = `${apiUrl}/phones`;
    if(limit){
      url += `?limit=${limit}`;
    }
    return this.http.get<Phone[]>(url);
  }

  getMessages() {
    const { apiUrl} = environment;
    return this.http.get<Message[]>(`${apiUrl}/messages`);
  }
}
