import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Phone } from '../types/phone';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  phones : Phone[] = []
}
