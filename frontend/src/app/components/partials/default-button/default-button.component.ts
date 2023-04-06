/* This is a TypeScript class for a default button component in Angular with customizable text,
background color, font color, type, font size, and width, and an output event for click actions. */
/* `EventEmitter` is a class in Angular that allows components to emit custom
events. In this specific code, `onClick` is an instance of `EventEmitter` that
emits an event when the button is clicked. Other components can then listen for
this event and perform actions accordingly. */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

/* `@Component` is a decorator in Angular that is used to define a component. The `selector` property
specifies the name of the component that can be used in other components' templates. The
`templateUrl` property specifies the HTML template file for the component, and the `styleUrls`
property specifies the CSS file(s) for the component. In this specific code, the
`DefaultButtonComponent` is being defined as a component with the selector `default-button`, and its
HTML template and CSS files are being specified. */
@Component({
  selector: "default-button",
  templateUrl: "./default-button.component.html",
  styleUrls: ["./default-button.component.css"],
})
/* This is a TypeScript class for a default button component with various input properties and an
output event emitter for click events. */
export class DefaultButtonComponent implements OnInit {
  /* These are input and output properties of the `DefaultButtonComponent` class. */
  @Input() text: string = "Submit";
  @Input() backgroundColor = "royalblue";
  @Input() color = "whitesmoke";
  @Input() type: "submit" | "button" = "submit";
  @Input() fontSizeRem = 1.25;
  @Input() widthSizeRem = 12;
  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
