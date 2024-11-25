import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(
    passwordControlName: string,
    rePasswordControlName: string
): ValidatorFn {
    return (control)=>{
        const passwordFormControl = control.get(passwordControlName);
        const rePasswordControl =  control.get(rePasswordControlName);

        const passwordsAreMatching = passwordFormControl?.value === 
        rePasswordControl?.value;
        
        return passwordsAreMatching ? null : { matchPasswordValidator: true };
    }
}