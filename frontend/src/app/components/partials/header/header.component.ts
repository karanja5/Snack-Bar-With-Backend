import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/shared/models/User";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  cartQuantity: number = 0;
  user!: User;

  constructor(cartService: CartService, private userService: UserService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    userService.userObservable.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  logout() {
    this.userService.logout();
  }

  get isLoggedIn() {
    return this.user.token;
  }
}
