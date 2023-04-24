import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/shared/models/Order";
import { CartService } from "../../../services/cart.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

//window.paypal
declare var paypal: any;

@Component({
  selector: "payment-button",
  templateUrl: "./payment-button.component.html",
  styleUrls: ["./payment-button.component.css"],
})
export class PaymentButtonComponent implements OnInit {
  @Input() order!: Order;

  @ViewChild("paymentButton", { static: true }) paymentElement!: ElementRef;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.payForOrder(this.order).subscribe({
            next: (orderId: string) => {
              this.cartService.clearCart();
              this.router.navigateByUrl("/track/" + orderId);
              this.toastrService.success(
                "Payment Processed",
                "Successfully Saved"
              );
            },
            error: (err) => {
              this.toastrService.error(`Error saving payment`, `${err}`);
            },
          });
        },
        onError: (err: any) => {
          this.toastrService.error(
            `Error processing payment`,
            "Payment Failed"
          );
          console.log(err);
        },
      })
      .render(this.paymentElement.nativeElement);
  }
}
