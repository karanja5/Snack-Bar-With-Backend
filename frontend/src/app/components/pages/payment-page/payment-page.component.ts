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
}
