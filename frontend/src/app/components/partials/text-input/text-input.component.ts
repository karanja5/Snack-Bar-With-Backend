/* This is a TypeScript class for a text input component in Angular that takes in various input
properties. */
import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: "text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.css"],
})
export class TextInputComponent implements OnInit {
  /* These are input properties for the `TextInputComponent` class in Angular. */
  @Input() control!: AbstractControl;
  @Input() showErrorIf: boolean = true;
  @Input() label!: string;
  @Input() type: "text" | "password" | "email" = "text";

  /**
   * This function returns the control as a FormControl.
   * @returns The `get` method is returning the `control` property of the class instance, which is cast
   * as a `FormControl`.
   */
  get formControl() {
    return this.control as FormControl;
  }
  constructor() {}

  ngOnInit() {}
}
