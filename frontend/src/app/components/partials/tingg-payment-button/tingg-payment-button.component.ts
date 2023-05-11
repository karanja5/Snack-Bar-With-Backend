import { Component, Input, OnInit } from "@angular/core";
import { Order } from "src/app/shared/models/Order";
import { CHECKOUT_ENCRYPTION_URL } from "src/app/shared/constants/urls";
import { ToastrService } from "ngx-toastr";
// import { OrderService } from "src/app/services/order.service";
declare var Tingg: any;
@Component({
  selector: "app-tingg-payment-button",
  templateUrl: "./tingg-payment-button.component.html",
  styleUrls: ["./tingg-payment-button.component.css"],
})
export class TinggPaymentButtonComponent implements OnInit {
  @Input() order!: Order;
  constructor(private toastrService: ToastrService) {}

  renderTinggButton() {
    Tingg.renderPayButton({
      text: "Pay with Tingg",
      color: "purple",
      className: "awesome-checkout-button",
    });
    (document.querySelector(
      ".awesome-checkout-button"
    ) as HTMLElement).addEventListener("click", async () => {
      await fetch(CHECKOUT_ENCRYPTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.order),
      })
        .then((resp) => {
          if (resp.ok) {
            this.toastrService.success("Payment Successful");
            return resp.json();
          } else {
            throw new Error(resp.statusText);
          }
        })
        .then((json) => {
          console.log(json);
          window.location.href = json.data;
        })
        .catch((error) => {
          this.toastrService.error("Payment Failed", error);
          console.log(error);
        });
    });
  }

  ngOnInit() {
    this.renderTinggButton();
  }
}
