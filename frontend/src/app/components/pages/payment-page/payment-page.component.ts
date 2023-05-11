import { Component, OnInit } from "@angular/core";
import { Order } from "../../../shared/models/Order";
import { OrderService } from "src/app/services/order.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-payment-page",
  templateUrl: "./payment-page.component.html",
  styleUrls: ["./payment-page.component.css"],
})
export class PaymentPageComponent implements OnInit {
  currentOrder: Order = new Order();

  /**
   * This function initializes the current order for the current user and redirects to the checkout page
   * if the cart is empty.
   * @param {OrderService} orderService - an instance of the OrderService class, which is used to
   * retrieve the current user's new order.
   * @param {ToastrService} toastrService - ToastrService is a service provided by the Toastr library
   * that allows displaying toast notifications in the application. It is used in this constructor to
   * display an error message if the cart is empty.
   * @param {Router} router - Router is a service provided by Angular that allows for navigation between
   * different views or components in a single-page application. It provides methods for navigating to a
   * specific route, navigating back to the previous route, and more. In this constructor, the Router is
   * used to navigate to the "/checkout" route if there
   */
  constructor(
    orderService: OrderService,
    private toastrService: ToastrService,
    router: Router
  ) {
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.currentOrder = order;
      },
      error: () => {
        this.toastrService.error("Cart is empty");
        router.navigateByUrl("/checkout");
      },
    });
  }
  ngOnInit(): void {}
  scrollToAddToPayButton() {
    const paypalButton = document.querySelector("#paypal-button");
    if (paypalButton) {
      const top = paypalButton.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
}
