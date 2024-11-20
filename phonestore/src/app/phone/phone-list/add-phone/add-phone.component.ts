import { Component } from '@angular/core';
import { Phone } from '../../../types/phone';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-add-phone',
  standalone: true,
  imports: [],
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css'
})
export class AddPhoneComponent {
  phone = {} as Phone;

  constructor(private apiService: ApiService){}

  addPhone(event: Event,model: string,screenSize: string,price: string,image: string,phoneText: string){
    event.preventDefault()
    console.log({model,screenSize,price,image,phoneText});
    this.apiService.createPhone(model,screenSize,price,image,phoneText).subscribe(data=>{
      console.log(data);
      
    })
  }
}
