import { AbstractControl } from "@angular/forms";

export function PasswordMatchValidator(
  passwordControlName: string,
  confirmPasswordControlName: string
) {
  function validator(form: AbstractControl) {
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) return;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      const errors = confirmPasswordControl.errors;
      if (!errors) return;

      delete errors.passwordMismatch;
      confirmPasswordControl.setErrors(errors);
    }
  }
  return validator;
}
