/* This is a TypeScript class for a component that displays a "not found" message with an option to go
back to the homepage. */
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"],
})
export class NotFoundComponent implements OnInit {
  /* These are input properties of the `NotFoundComponent` class in TypeScript. */
  @Input() visible: boolean = false;
  @Input() notFoundMessage: string = "Item not found";
  @Input() resetLinkText: string = "Go Back To Homepage";
  @Input() resetLinkUrl: string = "/";
  constructor() {}

  ngOnInit() {}
}
