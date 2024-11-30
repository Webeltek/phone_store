import { Component, OnInit } from '@angular/core';
import { Phone } from '../../../types/phone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-current-phone',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './current-phone.component.html',
  styleUrl: './current-phone.component.css'
})
export class CurrentPhoneComponent implements OnInit{
  isOrdered = false;
  phone  : Phone | null = null;

  constructor(private route: ActivatedRoute, 
    private apiService: ApiService,
    private userService: UserService){

  }

  get isAuthenticated(): boolean {
    return this.userService.isLogged
  }

  get username(): string {
    return this.userService.user?.username || ''
  }

  get isOwner() : boolean {
    //console.log(this.phone?.owner, this.userService.user?._id);
    
    //console.log('isOwner: ',this.phone?.owner._id === this.userService.user?._id);
    
    return this.phone?.owner === this.userService.user?._id
  }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      //console.log(data['phoneId']);
      
    })


    const id = this.route.snapshot.params['phoneId'];
    this.apiService.getSinglePhone(id).subscribe(phone=>{
      this.phone = phone;
    })
  }
}
