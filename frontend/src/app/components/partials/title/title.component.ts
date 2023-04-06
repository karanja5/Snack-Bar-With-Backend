/* This is an Angular component that defines input properties for a title, including the title itself,
margin, and font size. */
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.css"],
})
export class TitleComponent implements OnInit {
  /* These are input properties in an Angular component. */
  @Input() title!: string;
  @Input() margin? = "1rem 0 1rem 0.2rem";
  @Input() fontSize? = "1.5rem";

  constructor() {}

  ngOnInit(): void {}
}
