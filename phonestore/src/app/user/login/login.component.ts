import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EMAIL_PREFIX_LENGTH } from '../../constants';
import { EmailDirective } from '../../directives/email.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailPrefixLength = EMAIL_PREFIX_LENGTH;
  constructor(
    private userService: UserService,
    private router: Router
  ){}

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
