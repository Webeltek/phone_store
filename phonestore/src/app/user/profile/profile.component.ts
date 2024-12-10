import { Component, OnInit } from '@angular/core';
import { Phone } from '../../types/phone';
import { ProfileDetails, User, UserForAuth } from '../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ){}

  createdPhones: Phone[] = [];
  orderedPhones : Phone[] = [];
  imagesUrl = environment.IMAGES_URL;


  isEditMode: boolean = false;

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  profileDetails = {
    username: '',
    email: ''
  }

  form = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(5)]),
    email: new FormControl('',[Validators.required,emailValidator(environment.EMAIL_PREFIX_LENGTH)])
  })

  handleSaveProfile(){
    if(this.form.invalid){
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    const { username, email} = this.profileDetails;

    this.userService.updateProfile(username,email).subscribe(()=>{
      this.toggleEditMode()
    })

  }

  onCancel(event: Event){
    event.preventDefault()
    this.toggleEditMode()
  }

  ngOnInit(): void {
    const { username, email } = this.userService.user!;
    this.profileDetails = { username, email}

    this.form.setValue({
      username,
      email
    })

    this.apiService.getOwnedPhones().subscribe(phones =>{
      this.createdPhones = phones;
    })

    this.apiService.getOrderedPhones().subscribe(phones =>{
      this.orderedPhones = phones;
    })
  }
}
