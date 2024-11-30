import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { EMAIL_PREFIX_LENGTH } from '../../constants';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { RegUser, UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private router: Router){}

  registerForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern('[a-zA-Z0-9]+')]),
    email: new FormControl('',[Validators.required, emailValidator(EMAIL_PREFIX_LENGTH)]),
    //todo put Password in group
    passGroup: new FormGroup({
      password: new FormControl('',[Validators.required,Validators.minLength(5)]),
      rePassword : new FormControl('',[Validators.required])
    },
    {
      validators: [matchPasswordsValidator('password','rePassword')],
    }
  )
  })

  isFieldTextMissing(controlName: string) {
    return this.registerForm.get(controlName)?.touched 
    && this.registerForm.get(controlName)?.errors?.['required']
  }
                  
  get isNotMinLength() {
    return this.registerForm.get('username')?.touched 
    && this.registerForm.get('username')?.errors?.['minlength'] 
  }

  get isEmailNotValid() {
    return this.registerForm.get('email')?.touched 
    && this.registerForm.get('email')?.errors?.['emailValidator'] 
  }

  get passGroup(){
    return this.registerForm.get('passGroup')
  }
    
  
  // TODO : modify 
  register(){
    console.log(this.registerForm.value);
    
    if(this.registerForm.invalid){
      return
    }
    console.log(this.registerForm.value);
    

    const { 
      username, 
      email, 
      passGroup: {password, rePassword}= {}
    } = this.registerForm.value;

    this.userService.register(username!,email!, password!, rePassword!)
    .subscribe(()=>{
      this.router.navigate(['/phones'])
    })
    
  }
}
