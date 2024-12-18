import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { environment } from '../../../environments/environment';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { RegUser, UserService } from '../user.service';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  errorMsg = signal('');

  constructor(
    private userService: UserService,
    private router: Router,
    private errorMsgService : ErrorMsgService){}

  ngOnInit(): void {
    this.errorMsgService.apiError$.subscribe( (err: any)=>{
      //console.log({errRegComp: err});
      if(err?.status !== 401){
        this.errorMsg.set(err?.error.message);
      }
    })
  }  

  registerForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern('[a-zA-Z0-9]+')]),
    email: new FormControl('',[Validators.required, emailValidator(environment.EMAIL_PREFIX_LENGTH)]),
    //todo put Password in group
    passGroup: new FormGroup({
      password: new FormControl('',[Validators.required,Validators.minLength(5), Validators.pattern('[a-zA-Z0-9]+')]),
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
    //console.log(this.registerForm.value);
    
    if(this.registerForm.invalid){
      return
    }
    

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
