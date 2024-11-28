import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Phone } from './types/phone';
import { Message } from './types/message';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPhones(){
    let url = `/api/phones`;
    return this.http.get<Phone[]>(url);
  }

  getLatestPhones(limit?: Number){
    let url = `/api/phones/latest`;
    if(limit){
      url += `?limit=${limit}`;
    }
    return this.http.get<Phone[]>(url);
  }

  getSinglePhone(id: string){
    return this.http.get<Phone>(`/api/phones/${id}`)
  }

  getMessages() {
    return this.http.get<Message[]>(`/api/messages`);
  }

  createPhone(model: string,screenSize: string,price: string,image: string,phoneText: string){
    const payload = { model, screenSize, price, image, phoneText}
    return this.http.post<Phone>(`/api/phones`,payload)
  }
}
