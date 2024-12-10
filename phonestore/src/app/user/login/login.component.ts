import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { EmailDirective } from '../../directives/email.directive';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  errorMsg = signal('');
  emailPrefixLength = environment.EMAIL_PREFIX_LENGTH;


  constructor(
    private userService: UserService,
    private router: Router,
    private errorMsgService: ErrorMsgService
  ){}

  ngOnInit(): void {
    this.errorMsgService.apiError$.subscribe( (err: any)=>{
      //console.log({errorMgComp: err});
      if(err?.error.message !== 'Invalid token!'){
        this.errorMsg.set(err?.error.message);
      }
    })
  }

  login(form: NgForm){
    if(form.invalid){
      console.error('Invalid Login Form');
      return
    }

    const { email, password } = form.value;
    
    this.userService.login(email, password).subscribe(()=>{

      this.router.navigate(['/phones'])
    })
  }



}
