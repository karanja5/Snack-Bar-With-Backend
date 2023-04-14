import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CartService } from "src/app/services/cart.service";
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
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      name: ["", Validators.required],
      phoneNumber: ["+254", Validators.required],
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.error(
        "Please enter your name and phone number",
        "Invalid Inputs"
      );
      return;
    }

    this.order.name = this.checkoutForm.value.name;
    this.order.phoneNumber = this.checkoutForm.value.phoneNumber;
    console.log(this.order);
  }
}
