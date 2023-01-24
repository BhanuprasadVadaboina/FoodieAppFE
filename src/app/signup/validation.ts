import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function vldtefrstnme():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
    const re=new RegExp("^[a-zA-Z]*$");
    if(re.test(control.value)){
        return null;
    }
    else{
        return {vldtefrstnme:{value:control.value}};
    }
}
}