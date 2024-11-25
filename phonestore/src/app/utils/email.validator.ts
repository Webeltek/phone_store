import { ValidatorFn } from "@angular/forms";


export function emailValidator(emailPrefixLength: number | null): ValidatorFn {
    const emailPref = emailPrefixLength === null ? 1 : emailPrefixLength;
    const regExp = new RegExp(`[_a-z0-9\.]{${emailPref},}@[a-z0-9_]+\\.[a-z0-9_]+`)
    //console.log({regExp});
    
    return (control)=>{
        const isValid = control.value === '' || regExp.test(control.value)
        
        //console.log(isValid);
        
        return isValid ? null: { emailValidator : true}
    }
}