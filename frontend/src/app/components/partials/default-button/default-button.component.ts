import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-default-button",
  templateUrl: "./default-button.component.html",
  styleUrls: ["./default-button.component.css"],
})
export class DefaultButtonComponent implements OnInit {
  @Input() text: string = "Submit";
  @Input() backgroundColor = "royalblue";
  @Input() color = "whitesmoke";
  @Input() type: "submit" | "button" = "submit";
  @Input() fontSizeRem = 1.25;
  @Input() widthSizeRem = 12;

  constructor() {}

  ngOnInit(): void {}
}
