import { Component, Input, OnInit } from "@angular/core";
import { Order } from "src/app/shared/models/Order";
// import { Order } from "../../../shared/models/Order";
// import { IOrder } from "../../../../../../backend/src/models/order.model";
// import { Router } from "@angular/router";
// import { OrderService } from "../../../services/order.service";

@Component({
  selector: "app-tingg-payment-button",
  templateUrl: "./tingg-payment-button.component.html",
  styleUrls: ["./tingg-payment-button.component.css"],
})
export class TinggPaymentButtonComponent implements OnInit {
  @Input() order!: Order;
  constructor() {}
  ngOnInit() {}
}
