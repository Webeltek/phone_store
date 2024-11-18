import { Component } from '@angular/core';
import { Phone } from '../../types/phone';
import { User } from '../../types/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | null = null
  createdPhones: Phone[] = [];
  orderedPhones : Phone[] = [];
}
