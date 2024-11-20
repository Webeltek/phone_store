import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserService){}

  login(event:Event, emailValue:string, passwordValue:string){
    event.preventDefault();
    console.log(emailValue,passwordValue);
    
    this.userService.login()
  }

}
