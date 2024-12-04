import { Component } from '@angular/core';
import { PosNumDirective } from '../../../directives/posNum.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { Phone } from '../../../types/phone';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-phone',
  standalone: true,
  imports: [FormsModule,PosNumDirective],
  templateUrl: './edit-phone.component.html',
  styleUrl: './edit-phone.component.css'
})
export class EditPhoneComponent {
  phone : Phone | null = {} as Phone;

  constructor(private apiService: ApiService, private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  editPhone(form: NgForm){
    //console.log(form.invalid);
    //console.log(form.value);

    const phoneId = this.activatedRoute.snapshot.params['phoneId'];
    
    if(form.invalid){
      return;
    }

    const { model,screenSize,price,image,description} = form.value;
    this.apiService.editPhone(phoneId,model,screenSize,price,image,description).subscribe(data=>{
      this.router.navigate(['/phones'])
    })
  }
}
