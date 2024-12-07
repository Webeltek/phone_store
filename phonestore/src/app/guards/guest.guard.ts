import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../user/user.service";
import { map, of, switchMap } from "rxjs";

export const GuestGuard: CanActivateFn = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>{
    const userService = inject(UserService);
    const router = inject(Router)
    const user = sessionStorage.getItem(userService.USER_KEY);
    const hasUser = !!user ? true : false;

    if(!hasUser){
        return true
    } else {
        router.navigate(['/home'])
        return false;
    }
}