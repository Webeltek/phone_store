import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { UserForAuth } from '../../types/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router){}

  user : UserForAuth | null = null

  get email(): string {
    return this.userService.user?.email || ''
  }
  
  get isAuthenticated(): boolean {
    return this.userService.isLogged
  }

  logout(){
    this.userService.logout()
    this.router.navigate(['/home'])
  }
  
}
