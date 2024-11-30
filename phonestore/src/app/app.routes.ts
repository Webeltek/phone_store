import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ErrorComponent } from './error/error.component';
import { PhoneListComponent } from './phone/phone-list/phone-list.component';
import { CurrentPhoneComponent } from './phone/phone-list/current-phone/current-phone.component';
import { AddPhoneComponent } from './phone/phone-list/add-phone/add-phone.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { EditPhoneComponent } from './phone/phone-list/edit-phone/edit-phone.component';

export const routes: Routes = [
    { path: '', redirectTo : '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'phones', children: [ 
        { path: '', component: PhoneListComponent},
        { path: ':phoneId', component: CurrentPhoneComponent},
        { path: ':phoneId/edit', component: EditPhoneComponent, canActivate: [AuthGuard]}
        ] 
    },
    { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
    { path: 'add-phone', component: AddPhoneComponent, canActivate: [AuthGuard]},
    { path: '404', component: ErrorComponent},
    { path: '**', redirectTo: '/404'},
];
