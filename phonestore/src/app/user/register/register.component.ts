import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { EMAIL_PREFIX_LENGTH } from '../../constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(5)]),
    email: new FormControl('',[Validators.required, emailValidator(EMAIL_PREFIX_LENGTH)]),
    //todo put Password in group
    passGroup: new FormGroup({
      password: new FormControl('',[Validators.required]),
      rePassword : new FormControl('',[Validators.required])
    },
    {
      validators: [],
    }
  )
  })

  isFieldTextMissing(controlName: string) {
    return this.registerForm.get(controlName)?.touched 
    && this.registerForm.get(controlName)?.errors?.['required']
  }
                  
  get isNotMinLength() {
    return this.registerForm.get('name')?.touched 
    && this.registerForm.get('name')?.errors?.['minlength'] 
  }

  get isEmailNotValid() {
    return this.registerForm.get('email')?.touched 
    && this.registerForm.get('email')?.errors?.['emailValidator'] 
  }

  get passGroup(){
    return this.registerForm.get('passGroup')
  }
    
  

  register(){
    console.log(this.registerForm.invalid);
    
    if(this.registerForm.invalid){
      return
    }
  }
}
