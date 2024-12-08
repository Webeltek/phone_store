import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Phone } from '../types/phone';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { IMAGES_URL } from '../constants';
import { ElapsedTimePipe } from '../shared/pipes/elapsed-time.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ElapsedTimePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  phones : Phone[] = []
  imagesUrl = IMAGES_URL;

  constructor( private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getLatestPhones(5).subscribe(phones =>{
      this.phones = phones;
    })
  }
}
