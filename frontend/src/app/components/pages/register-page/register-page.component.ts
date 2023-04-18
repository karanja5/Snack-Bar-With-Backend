import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { IUserRegister } from "src/app/shared/Interfaces/IUserRegister";
import { PasswordMatchValidator } from "src/app/shared/validators/passwordMatchValidator";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.css"],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted: boolean = false;

  returnUrl = "";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.minLength(4)]],
        password: ["", [Validators.required, Validators.minLength(4)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(4)]],
        phoneNumber: [
          "+254",
          [
            Validators.required,
            Validators.minLength(13),
            Validators.maxLength(13),
          ],
        ],
      },
      {
        validators: PasswordMatchValidator("password", "confirmPassword"),
      }
    );
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }
  submitForm() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      phoneNumber: fv.phoneNumber,
    };

    this.userService.register(user).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
