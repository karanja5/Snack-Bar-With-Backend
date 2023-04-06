import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "default-button",
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
  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
