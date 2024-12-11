import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../user/user.service";
import { catchError, map, of, switchMap } from "rxjs";

export const GuestGuard: CanActivateFn = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
    const userService = inject(UserService);
    const router = inject(Router)

    return userService.getProfile().pipe(map((user)=>{
        //console.log({guestGuardUsr: user});
        
        if(user){
            router.navigate(['/home'])
            return false;
        } else {
            return true;
        }
    }), catchError((err)=>{
        //console.log({guestGuardcatchErr: err});
        
        return of(true);
        
    }))

}