import { ValidatorFn } from "@angular/forms";


export function posNumValidator(): ValidatorFn {
    
    return (control)=>{
        const num = Number(control.value)
        
        //console.log(isValid);
        
        return num >0 ? null: { posNumValidator : true}
    }
}