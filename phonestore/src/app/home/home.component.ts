import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Phone } from '../types/phone';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  phones : Phone[] = []
  constructor( private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getLatestPhones(5).subscribe(phones =>{
      this.phones = phones;
    })
  }
}
