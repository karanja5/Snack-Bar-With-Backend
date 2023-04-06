/* The HeaderComponent class is responsible for managing the header component of an Angular
application, including displaying the cart quantity and user information, and providing a logout
function. */
import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/shared/models/User";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
/* The HeaderComponent class manages the cart quantity and user authentication status. */
export class HeaderComponent implements OnInit {
  /* `cartQuantity: number = 0;` initializes the `cartQuantity` property of the `HeaderComponent` class
  to 0. This property is used to display the total number of items in the user's cart. */
  cartQuantity: number = 0;
  /* `user!: User;` is declaring a property named `user` of type `User` in the `HeaderComponent` class.
  The exclamation mark (`!`) is a non-null assertion operator, which tells TypeScript that the
  `user` property will be initialized at some point before it is used, even though it is not
  initialized in the constructor. This is useful when working with asynchronous code, where the
  value of a property may not be available immediately. */
  user!: User;

  constructor(cartService: CartService, private userService: UserService) {
    /* `cartService.getCartObservable().subscribe((newCart) => { this.cartQuantity =
    newCart.totalCount;` is subscribing to the `cartService`'s observable that emits the updated
    cart information. Whenever the cart information changes, the callback function `(newCart) => {
    this.cartQuantity = newCart.totalCount; }` is executed, which updates the `cartQuantity`
    property of the `HeaderComponent` class with the new total count of items in the cart. This
    ensures that the header component always displays the correct cart quantity. */
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    /* `userService.userObservable.subscribe((user) => { this.user = user;` is subscribing to the
    `userObservable` observable of the `userService`. Whenever the `user` property of the
    `userService` changes, the callback function `(user) => { this.user = user; }` is executed,
    which updates the `user` property of the `HeaderComponent` class with the new user information.
    This ensures that the header component always displays the correct user information. */
    userService.userObservable.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  /**
   * The function calls the logout method of the userService.
   */
  logout() {
    this.userService.logout();
  }

  /**
   * This function checks if a user is logged in by verifying the presence of a token.
   * @returns The `isLoggedIn` getter is returning a boolean value based on whether the `user` object
   * has a `token` property or not. If the `token` property exists, it will return `true`, indicating
   * that the user is logged in. If the `token` property does not exist, it will return `false`,
   * indicating that the user is not logged in.
   */
  get isLoggedIn() {
    return this.user.token;
  }
}
