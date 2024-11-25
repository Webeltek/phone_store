import { Component } from '@angular/core';
import { Phone } from '../../../types/phone';
import { ApiService } from '../../../api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-phone',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css'
})
export class AddPhoneComponent {
  phone = {} as Phone;

  constructor(private apiService: ApiService){}

  addPhone(form: NgForm){
    console.log(form.invalid);
    console.log(form.value);
    
    if(form.invalid){
      return;
    }
    
    // this.apiService.createPhone(model,screenSize,price,image,phoneText).subscribe(data=>{
    //   console.log(data);
    // })
  }
}
