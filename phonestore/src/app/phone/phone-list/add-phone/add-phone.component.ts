import { Component } from '@angular/core';
import { Phone } from '../../../types/phone';
import { ApiService } from '../../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PosNumDirective } from '../../../directives/posNum.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-phone',
  standalone: true,
  imports: [FormsModule,PosNumDirective],
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css'
})
export class AddPhoneComponent {
  phone = {} as Phone;

  constructor(private apiService: ApiService, private router: Router){}

  selectedFile: File | string = 'emptyImageFile';
  fileError: string | null = null;
  fileTouched = false;

  addPhone(form: NgForm){
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
    if(this.selectedFile !== 'emptyImageFile'){
      formData.append('imageFile',this.selectedFile)
    }
    formData.append('description',description)
    this.apiService.createPhone(formData).subscribe(data=>{
      //console.log(data);
      this.router.navigate(['/phones'])
    })
  }


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
