import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CartService } from "src/app/services/cart.service";
import { OrderService } from "src/app/services/order.service";
import { UserService } from "src/app/services/user.service";
import { Order } from "src/app/shared/models/Order";
@Component({
  selector: "app-checkout-page",
  templateUrl: "./checkout-page.component.html",
  styleUrls: ["./checkout-page.component.css"],
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, phoneNumber, email } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      email: [email, Validators.required],
      phoneNumber: [phoneNumber, Validators.required],
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning(
        "Please enter your name, email and phone number",
        "Invalid Inputs"
      );
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.phoneNumber = this.fc.phoneNumber.value;
    this.order.email = this.fc.email.value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl("/payment");
        this.toastrService.success("Order created", "Success");
      },
      error: (eResponse) => {
        this.toastrService.error(eResponse.error.message, "Order is empty");
      },
    });
  }
  scrollToAddToOrderNow() {
    const checkoutButton = document.querySelector("#order-button");
    if (checkoutButton) {
      const top =
        checkoutButton.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
}
