/* This is a TypeScript class that implements the functionality of a shopping cart page, including
removing items from the cart and changing the quantity of items in the cart. */
import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { Cart } from "src/app/shared/models/Cart";
import { CartItem } from "src/app/shared/models/CartItem";

@Component({
  selector: "app-cart-page",
  templateUrl: "./cart-page.component.html",
  styleUrls: ["./cart-page.component.css"],
})
/* The CartPageComponent class is responsible for managing the cart and its items, allowing users to
remove items and change their quantities. */
export class CartPageComponent implements OnInit {
  /* `cart!: Cart;` is declaring a property named `cart` of type `Cart`, but with the `!` operator
  indicating that it may be null or undefined at runtime. This is because the property is
  initialized in the constructor using an asynchronous call to `getCartObservable()` from the
  `CartService`, which may not have returned a value yet when the component is initialized. The `!`
  operator tells TypeScript to allow the property to be null or undefined, but the code must handle
  this possibility at runtime to avoid errors. */
  cart!: Cart;
  /**
   * This constructor subscribes to the cart observable from the CartService and updates the cart
   * property accordingly.
   * @param {CartService} cartService - The `cartService` parameter is an instance of the `CartService`
   * class, which is used to manage the shopping cart functionality in the application. It is injected
   * into the constructor using dependency injection.
   */
  constructor(private cartService: CartService) {
    /* This code is subscribing to the `cart` observable from the `CartService` and updating the `cart`
    property of the `CartPageComponent` class with the latest value emitted by the observable.
    Whenever the `cart` observable emits a new value, the arrow function passed to the `subscribe`
    method is called with the new value as its argument, and the `cart` property of the component is
    updated with this new value. This allows the component to always have access to the latest
    version of the shopping cart data, and to update its view accordingly. */
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }
  ngOnInit(): void {}
  /**
   * The function removes a food item from the cart.
   * @param {CartItem} cartItem - CartItem is a custom data type that likely contains information about
   * a food item that has been added to a shopping cart. The parameter `cartItem` is an instance of
   * this data type and is passed into the `removeFromCart` function. The function then calls a method
   * on the `cartService`
   */
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }
  /**
   * This function changes the quantity of a food item in the user's cart.
   * @param {CartItem} cartItem - CartItem is an object that represents a food item in the user's
   * shopping cart. It likely contains information such as the food's name, price, and quantity.
   * @param {string} quantityInString - A string representing the quantity of a cart item that needs to
   * be changed.
   */
  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
  scrollToCheckout() {
    const checkoutButton = document.querySelector("#checkout-button");
    if (checkoutButton) {
      const top =
        checkoutButton.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
}
