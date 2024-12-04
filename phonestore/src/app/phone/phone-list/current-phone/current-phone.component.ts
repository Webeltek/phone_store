import { Component, OnInit } from '@angular/core';
import { Phone } from '../../../types/phone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { UserService } from '../../../user/user.service';
import { ElapsedTimePipe } from '../../../shared/pipes/elapsed-time.pipe';

@Component({
  selector: 'app-current-phone',
  standalone: true,
  imports: [RouterLink, ElapsedTimePipe],
  templateUrl: './current-phone.component.html',
  styleUrl: './current-phone.component.css'
})
export class CurrentPhoneComponent implements OnInit{

  phone = {} as Phone;
  phoneId = '';

  constructor(private route: ActivatedRoute, 
    private apiService: ApiService,
    private userService: UserService,
    private router: Router){
    
  }

  get isAuthenticated(): boolean {
    return this.userService.isLogged
  }

  get username(): string {
    return this.userService.user?.username || ''
  }

  get isOwner() : boolean {
    return this.phone?.owner === this.userService.user?._id
  }

  get isOrdered() : boolean {
    const hasOrdered = this.phone?.orderList?.some((orderUserId) => orderUserId === this.userService.user?._id)
    return !!hasOrdered
  }

  ngOnInit(): void {
    this.phoneId = this.route.snapshot.params['phoneId'];
    this.fetchPhone(this.phoneId);

  }

  fetchPhone(phoneId: string){
    this.apiService.getSinglePhone(phoneId).subscribe(phone=>{
      this.phone = phone;
    })
  }


  orderPhone(){
    if (this.isOrdered){
      return
    }
    this.apiService.orderPhone(this.phoneId).subscribe(()=>{
      this.fetchPhone(this.phoneId); 
    })

    console.log(this.isOrdered);
    
  }

  deletePhone(){
    if(!this.isOwner){
      return;
    }
    this.apiService.deletePhone(this.phoneId).subscribe(()=>{
      this.router.navigate(['/phones'])
    })
  }
}
