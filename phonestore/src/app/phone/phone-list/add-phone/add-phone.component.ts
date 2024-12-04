import { Component } from '@angular/core';
import { Phone } from '../../../types/phone';
import { ApiService } from '../../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PosNumDirective } from '../../../directives/posNum.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-phone',
  standalone: true,
  imports: [FormsModule,PosNumDirective],
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css'
})
export class AddPhoneComponent {
  phone = {} as Phone;

  constructor(private apiService: ApiService, private router: Router){}

  addPhone(form: NgForm){
    //console.log(form.invalid);
    //console.log(form.value);
    
    if(form.invalid){
      return;
    }

    const { model,screenSize,price,image,description} = form.value;
    this.apiService.createPhone(model,screenSize,price,image,description).subscribe(data=>{
      //console.log(data);
      this.router.navigate(['/phones'])
    })
  }
}
