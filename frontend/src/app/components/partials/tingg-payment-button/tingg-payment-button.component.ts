import { Component, Input, OnInit } from "@angular/core";
// import { Order } from "../../../shared/models/Order";
import { IOrder } from "../../../../../../backend/src/models/order.model";
import { Router } from "@angular/router";
import { OrderService } from "../../../services/order.service";

@Component({
  selector: "app-tingg-payment-button",
  templateUrl: "./tingg-payment-button.component.html",
  styleUrls: ["./tingg-payment-button.component.css"],
})
export class TinggPaymentButtonComponent implements OnInit {
  // @Input() order!: Order;
  @Input() order!: IOrder;

  constructor(router: Router, orderService: OrderService) {
    const PAYLOAD = {
      merchantTransactionID: this.order.id,
      requestAmount: this.order.totalPrice,
      currencyCode: "KES",
      accountNumber: this.order.user,
      serviceCode: "TESTDEV123",
      // "dueDate" : "",
      requestDescription: "Getting service/good x",
      countryCode: "KE",
      languageCode: "en",
      customerFirstName: this.order.name,
      customerLastName: this.order.name,
      MSISDN: this.order.phoneNumber,
      customerEmail: this.order.email,
      paymentWebhookUrl: "<YOUR_CALLBACK_URL>",
      successRedirectUrl: "/track/" + this.order.id,
      failRedirectUrl: "<YOUR_FAIL_REDIRECT_URL>",
    };
  }

  ngOnInit() {}
}
