import { Component, OnInit } from '@angular/core';
import { Phone } from '../../types/phone';
import { ProfileDetails, User } from '../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { EMAIL_PREFIX_LENGTH } from '../../constants';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private apiService: ApiService){}

  user: User | null = null
  createdPhones: Phone[] = [];
  orderedPhones : Phone[] = [];


  isEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    username: 'JohnDoe',
    email: 'johndoe123@gmail.com'
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  form = new FormGroup({
    username: new FormControl(this.profileDetails.username,[Validators.required, Validators.minLength(5)]),
    email: new FormControl(this.profileDetails.email,[Validators.required,emailValidator(EMAIL_PREFIX_LENGTH)])
  })

  handleSaveProfile(){
    if(this.form.invalid){
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    this.toggleEditMode()
  }

  onCancel(event: Event){
    event.preventDefault()
    this.toggleEditMode()
  }

  ngOnInit(): void {
    this.apiService.getOwnedPhones().subscribe(phones =>{
      this.createdPhones = phones;
    })

    this.apiService.getOrderedPhones().subscribe(phones =>{
      this.orderedPhones = phones;
    })
  }
}
