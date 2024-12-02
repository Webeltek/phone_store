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

  getOwnedPhones(){
    let url = `/api/phones/owned`;
    return this.http.get<Phone[]>(url);
  }

  getOrderedPhones(){
    let url = `/api/phones/ordered`;
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

  createPhone(model: string,screenSize: string,price: string,image: string,description: string){
    const payload = { model, screenSize, price, image, description}
    return this.http.post<Phone>(`/api/phones`,payload)
  }

  editPhone(phoneId: string,model: string,screenSize: string,price: string,image: string,description: string){
    const payload = { model, screenSize, price, image, description}
    return this.http.put<Phone>(`/api/phones/${phoneId}`,payload)
  }

  deletePhone(phoneId: string){
    return this.http.delete(`/api/phones/${phoneId}`);
  }

  orderPhone(phoneId: string){
    return this.http.put<Phone>(`/api/phones/${phoneId}/order`,{})
  }
}
