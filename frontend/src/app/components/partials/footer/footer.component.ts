import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  footerText: string = "2023 Sasini Snack Bar";

  constructor() {}

  ngOnInit() {}
}
