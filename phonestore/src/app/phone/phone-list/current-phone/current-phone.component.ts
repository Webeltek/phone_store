import { Component, OnInit } from '@angular/core';
import { Phone } from '../../../types/phone';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-current-phone',
  standalone: true,
  imports: [],
  templateUrl: './current-phone.component.html',
  styleUrl: './current-phone.component.css'
})
export class CurrentPhoneComponent implements OnInit{
  isAuthenticated = true
  isOwner = false;
  isPreferred = false;
  phone  = {} as Phone

  constructor(private route: ActivatedRoute, private apiService: ApiService){

  }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      console.log(data['phoneId']);
      
    })


    const id = this.route.snapshot.params['phoneId'];
    this.apiService.getSinglePhone(id).subscribe(phone=>{
      this.phone = phone;
    })
  }
}
