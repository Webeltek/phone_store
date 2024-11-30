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

  get username(): string {
    return this.userService.user?.username || ''
  }
  
  get isAuthenticated(): boolean {
    return this.userService.isLogged
  }

  logout(){
    this.userService.logout().subscribe(()=>{
      this.router.navigate(['/login'])
    })

  }
  
}
