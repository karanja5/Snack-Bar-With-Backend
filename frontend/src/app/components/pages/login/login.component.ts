/* This is a TypeScript class for a login component that handles user authentication using Angular
forms and a user service. */
import { Component, OnInit } from "@angular/core";
/* Importing the `FormBuilder`, `FormGroup`, and `Validators` classes from the `@angular/forms` module.
These classes are used to create and validate forms in Angular applications. */
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
/* The LoginComponent class is responsible for handling user login functionality and form validation. */
export class LoginComponent implements OnInit {
  /* These are properties of the `LoginComponent` class. */
  /* `loginForm!: FormGroup;` is declaring a property `loginForm` of type `FormGroup` with the `!`
  operator indicating that it will be initialized later. This property will hold the form data and
  validation rules for the login form. */
  loginForm!: FormGroup;
  /* `isSubmitted` is a boolean property initialized to `false`. It is used to keep track of whether
  the login form has been submitted or not. When the user submits the form, `isSubmitted` is set to
  `true` and the form is validated. If the form is invalid, the submit function returns without
  doing anything. If the form is valid, the `userService` is called to log in the user and the user
  is redirected to the `returnUrl`. */
  isSubmitted: boolean = false;
  /* `returnUrl: string = "";` is declaring a property `returnUrl` of type `string` and initializing it
  to an empty string. This property is used to store the URL that the user should be redirected to
  after successful login. It is initialized in the `ngOnInit` method by getting the `returnUrl`
  query parameter from the current route snapshot. If there is no `returnUrl` query parameter, the
  `returnUrl` property remains an empty string. */
  returnUrl: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * The ngOnInit function initializes a login form with email and password fields, and sets a return
   * URL parameter.
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ["+254", [Validators.required, Validators.minLength(13)]],
      password: ["", Validators.required],
    });

    /* `this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;` is setting the
    `returnUrl` property of the `LoginComponent` class to the value of the `returnUrl` query
    parameter from the current route snapshot. This is done in the `ngOnInit` method, which is
    called when the component is initialized. The `returnUrl` query parameter is typically used to
    redirect the user to the page they were trying to access before they were redirected to the
    login page. If there is no `returnUrl` query parameter, the `returnUrl` property remains an
    empty string. */
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  /**
   * This is a getter function that returns the controls of a login form.
   * @returns The code is returning the controls of the `loginForm` object. More specifically, it is
   * returning the controls property of the `loginForm` object.
   */
  get fC() {
    return this.loginForm.controls;
  }

  /**
   * The function submits a login form and logs the user in if the form is valid.
   * @returns If the login form is invalid, the function will return without performing any further
   * actions. If the login is successful, the user will be redirected to the page specified by
   * `this.returnUrl`. No other values are being returned explicitly in this function.
   */
  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    /* This code is calling the `login` method of the `userService` object with an object containing
    the user's email and password as arguments. The `login` method returns an observable, which is
    being subscribed to with a callback function that redirects the user to the `returnUrl` using
    the `router.navigateByUrl` method. This code is responsible for logging the user in and
    redirecting them to the appropriate page after successful login. */
    this.userService
      .login({
        phoneNumber: this.fC.phoneNumber.value,
        password: this.fC.password.value,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
