import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { AbstractControl } from "@angular/forms";

const VALIDATOR_MESSAGES: any = {
  required: "This field cannot be empty",
  email: "Please enter a valid email address",
};

@Component({
  selector: "input-validation",
  templateUrl: "./input-validation.component.html",
  styleUrls: ["./input-validation.component.css"],
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() showErrorIf: boolean = true;
  errorMessages: string[] = [];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit() {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }
  checkValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => {
      return VALIDATOR_MESSAGES[key];
    });
  }
}
