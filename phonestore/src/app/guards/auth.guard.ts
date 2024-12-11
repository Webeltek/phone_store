
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../user/user.service";
import { catchError, map, of } from "rxjs";

export const AuthGuard: CanActivateFn = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
    const userService = inject(UserService);
    const router = inject(Router)

    return userService.getProfile().pipe(map((user)=>{
        //console.log({guestGuardUsr: user});
        
        if(user){
            return true;
        } else {
            router.navigate(['/login'])
            return false;
        }
    }), catchError((err)=>{
        //console.log({authGuardCatchErr: err});
        router.navigate(['/login'])
        return of(false);
    }))

}