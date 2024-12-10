import { Component } from '@angular/core';
import { Phone } from '../../types/phone';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.css'
})
export class PhoneListComponent {
  phones : Phone[] = [];
  imagesUrl = environment.IMAGES_URL

  constructor( private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getPhones().subscribe(phones =>{
      this.phones = phones;
    })
  }
}
