import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { catchError, EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit{
  isAuthenticating = true;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    if (!this.userService.isLogged){

      this.userService.getProfile()
      .subscribe({
        next: (res)=> {
          //console.log({authCompUser: this.userService.isLogged});
          this.isAuthenticating = false;
        },
        error : (err) => {
          //console.log({authCompErr: err});
          this.isAuthenticating = false
        },
        complete: ()=>{
          this.isAuthenticating = false
        }
      })
    }
  }
}
