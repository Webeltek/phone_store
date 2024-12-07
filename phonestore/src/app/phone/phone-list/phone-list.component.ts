import { Component } from '@angular/core';
import { Phone } from '../../types/phone';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { IMAGES_URL } from '../../constants';

@Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.css'
})
export class PhoneListComponent {
  phones : Phone[] = [];
  imagesUrl = IMAGES_URL

  constructor( private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getPhones().subscribe(phones =>{
      this.phones = phones;
    })
  }
}
