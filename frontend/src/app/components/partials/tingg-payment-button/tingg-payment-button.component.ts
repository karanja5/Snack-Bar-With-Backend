import { Component, Input, OnInit } from "@angular/core";
import { Order } from "src/app/shared/models/Order";
import { CHECKOUT_ENCRYPTION_URL } from "src/app/shared/constants/urls";
import { ToastrService } from "ngx-toastr";
import { CartService } from "src/app/services/cart.service";
import { Router } from "@angular/router";
declare var Tingg: any;
@Component({
  selector: "app-tingg-payment-button",
  templateUrl: "./tingg-payment-button.component.html",
  styleUrls: ["./tingg-payment-button.component.css"],
})
export class TinggPaymentButtonComponent implements OnInit {
  @Input() order!: Order;
  constructor(
    private toastrService: ToastrService,
    private cartService: CartService,
    private router: Router
  ) {}

  /* `renderTinggButton()` is a method that is responsible for rendering the Tingg payment button on
  the component's template. It uses the `Tingg.renderPayButton()` method to create the button with
  the specified text, color, and class name. It also adds an event listener to the button that
  triggers a series of actions when clicked, including sending a POST request to a checkout
  encryption URL with the order details, redirecting the user to the payment page, clearing the
  cart, and navigating to the order tracking page. */

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
        .then(() => {
          this.cartService.clearCart();
          this.router.navigateByUrl("/track/" + this.order.id);
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
