import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "input-container",
  templateUrl: "./input-container.component.html",
  styleUrls: ["./input-container.component.css"],
})
export class InputContainerComponent implements OnInit {
  /* `@Input()` is a decorator in Angular that allows a component to receive input values from its
  parent component. In this case, `label` is an input property of the `InputContainerComponent`. */
  @Input() label!: string;
  backgroundColor = "white";

  constructor() {}

  ngOnInit() {}
}
