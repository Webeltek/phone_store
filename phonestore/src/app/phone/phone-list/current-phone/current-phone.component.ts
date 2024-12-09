import { Component, OnInit } from '@angular/core';
import { Phone } from '../../../types/phone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { UserService } from '../../../user/user.service';
import { ElapsedTimePipe } from '../../../shared/pipes/elapsed-time.pipe';
import { FormsModule, NgForm } from '@angular/forms';
import { IMAGES_URL } from '../../../constants';

@Component({
  selector: 'app-current-phone',
  standalone: true,
  imports: [RouterLink, ElapsedTimePipe, FormsModule],
  templateUrl: './current-phone.component.html',
  styleUrl: './current-phone.component.css'
})
export class CurrentPhoneComponent implements OnInit{

  phone = {} as Phone;
  phoneId = '';
  imagesUrl = IMAGES_URL;

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
    return this.phone?.owner?._id === this.userService.user?._id
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
      //console.log({currPhone: this.phone});
      //console.log({currPhoneMsgList: this.phone.msgList});
      
    })
  }


  orderPhone(){
    if (this.isOrdered){
      return
    }
    this.apiService.orderPhone(this.phoneId).subscribe(()=>{
      this.fetchPhone(this.phoneId); 
    })

    //console.log(this.isOrdered);
    
  }

  deletePhone(){
    if(!this.isOwner){
      return;
    }
    this.apiService.deletePhone(this.phoneId).subscribe(()=>{
      this.router.navigate(['/phones'])
    })
  }

  handlePost(postForm: NgForm){
    const { postText } = postForm.value;
    
    this.apiService.createMessage(this.phoneId, postText).subscribe(()=>{
      this.fetchPhone(this.phoneId)
      //console.log({updatedPhoneWithMsg: this.phone});

    })
  }
}
