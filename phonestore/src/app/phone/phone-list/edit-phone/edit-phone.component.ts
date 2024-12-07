import { Component, OnInit } from '@angular/core';
import { PosNumDirective } from '../../../directives/posNum.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { Phone } from '../../../types/phone';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-phone',
  standalone: true,
  imports: [FormsModule,PosNumDirective],
  templateUrl: './edit-phone.component.html',
  styleUrl: './edit-phone.component.css'
})
export class EditPhoneComponent implements OnInit{
  phone  = {
    model: '',
    screenSize: '',
    price: 0,
    image: '',
    description: ''
  };
  phoneId = '';

  constructor(private apiService: ApiService, private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.phoneId = this.activatedRoute.snapshot.params['phoneId'];
    this.apiService.getSinglePhone(this.phoneId).subscribe(phone=>{
      this.phone = phone;
    })

  }

  editPhone(form: NgForm){
    //console.log(form.invalid);
    //console.log(form.value);

    
    if(form.invalid){
      return;
    }

    const { model,screenSize,price,image,description} = form.value;
    const formData = new FormData();
    
    formData.append('model',model);
    formData.append('screenSize',screenSize)
    formData.append('price',price);
    formData.append('image',image);
    formData.append('imageFile',this.selectedFile!)
    formData.append('description',description)

    this.apiService.editPhone(this.phoneId,formData).subscribe(data=>{
      this.router.navigate(['/phones'])
    })
  }

  selectedFile: File | null = null;
  fileError: string | null = null;
  fileTouched = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const isValid = this.validateFile(file);
      this.selectedFile = input.files[0];
      if (isValid) {
        this.selectedFile = file;
        this.fileError = null;
      }
    }
  }

  onFileTouched(): void {
    this.fileTouched = true;
  }

  validateFile(file: File): boolean {
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'Invalid file type. Only JPEG and PNG are allowed.';
      return false;
    }

    if (file.size > maxFileSize) {
      this.fileError = 'File size exceeds the 5MB limit.';
      return false;
    }

    return true;
  }
}
