/* The CartService class manages the user's cart by adding, removing, changing quantity, and clearing
items, and also provides an observable of the current cart state. 
`Observable` is a class from the RxJS library that allows for asynchronous data streams. In
this context, the `getCartObservable()` method returns an observable of the current cart
state, which can be subscribed to by other components to receive updates whenever the cart
changes. */
/* `import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";` is importing the
`BehaviorSubject` class from the `rxjs` library. `BehaviorSubject` is a type of observable that
emits the most recent value to all subscribers upon subscription and then continues to emit any new
values. In this case, the `BehaviorSubject` class is used to create an observable of the current
cart state in the `CartService` class. */
import { Injectable } from "@angular/core";
import { Cart } from "../shared/models/Cart";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Food } from "../shared/models/food";
import { CartItem } from "../shared/models/CartItem";
import { Observable } from "rxjs/internal/Observable";

const CART_KEY = "cart";

@Injectable({
  providedIn: "root",
})
/* The CartService class manages the cart items, their quantities, and prices, and provides an
observable for changes to the cart. */
export class CartService {
  /* `private cart: Cart = this.getCartFromLocalStorage();` initializes a private property `cart` of
  type `Cart` with the value returned by the `getCartFromLocalStorage()` method. This means that
  when a new instance of the `CartService` class is created, it will check if there is a cart saved
  in the local storage and if there is, it will set the `cart` property to that value. If there is
  no cart saved in the local storage, it will create a new empty cart. */
  private cart: Cart = this.getCartFromLocalStorage();
  /* `private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart)` is
  initializing a private property `cartSubject` of type `BehaviorSubject<Cart>` with an initial
  value of `this.cart`. `BehaviorSubject` is a type of observable that emits the most recent value
  to all subscribers upon subscription and then continues to emit any new values. In this case, the
  `cartSubject` observable will emit the current state of the cart whenever a new subscriber
  subscribes to it, and will continue to emit any new changes to the cart. */
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    this.cart
  );

  constructor() {}

  /**
   * The function adds a food item to the cart if it is not already in the cart.
   * @param {Food} food - Food object that represents the item being added to the cart.
   * @returns If `cartItem` is truthy (i.e. an item with the same `id` as the `food` parameter already
   * exists in the cart), then the function returns nothing (`undefined`) and exits early. If
   * `cartItem` is falsy (i.e. no item with the same `id` as the `food` parameter exists in the cart),
   * then a new `CartItem
   */
  addToCart(food: Food): void {
    /* `let cartItem = this.cart.items.find((item) => item.food.id === food.id);` is finding an item in
    the cart that has the same `id` as the `food` parameter passed to the `addToCart()` method. It
    does this by using the `find()` method on the `items` array of the `cart` object, which returns
    the first element in the array that satisfies the provided testing function. The testing
    function in this case checks if the `id` of the `food` object passed to the `addToCart()` method
    matches the `id` of the `food` object in the `item` object in the `items` array. If a matching
    item is found, it is assigned to the `cartItem` variable. If no matching item is found,
    `cartItem` is assigned `undefined`. */
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) return;
    /* `this.cart.items.push(new CartItem(food));` is adding a new `CartItem` object to the `items`
    array of the `cart` object. The `CartItem` object is created using the `food` parameter passed
    to the `addToCart()` method, which represents the item being added to the cart. The `CartItem`
    object contains information about the `food` item, such as its `id`, `name`, `price`, and
    `quantity`. By adding the `CartItem` object to the `items` array, the `cart` object now contains
    a record of the item that has been added to the cart. */
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  /**
   * This function removes an item from the cart based on the food ID and updates the cart in local
   * storage.
   * @param {number} foodId - a number representing the ID of the food item that needs to be removed
   * from the cart.
   */
  removeFromCart(foodId: number): void {
    /* `this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);` is removing an
    item from the cart based on the `foodId` parameter passed to the `removeFromCart()` method. It
    does this by using the `filter()` method on the `items` array of the `cart` object, which
    returns a new array containing all elements that pass the provided testing function. 
    Essentially it filters the items array for all items that don't match the specific foodId 
    then save these new items into the items array creating a new array the excludes this specific item*/
    this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);
    this.setCartToLocalStorage();
  }

  /**
   * This function changes the quantity of a food item in the cart and updates the cart's total price
   * accordingly.
   * @param {number} foodId - a number representing the ID of the food item that needs its quantity
   * updated in the cart.
   * @param {number} quantity - The new quantity of the food item that needs to be updated in the cart.
   * @returns If `cartItem` is not found, the function returns nothing (`void`).
   */
  changeQuantity(foodId: number, quantity: number): void {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = cartItem.food.price * cartItem.quantity;
    this.setCartToLocalStorage();
  }

  /**
   * This function returns an observable of type Cart from a subject.
   * @returns An Observable of type Cart is being returned. The Observable is obtained by calling the
   * `asObservable()` method on the `cartSubject` Subject.
   */
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  /**
   * This function returns the current value of the cart subject.
   * @returns The `getCart()` method is returning an object of type `Cart`. The object being returned
   * is the current value of the `cartSubject` BehaviorSubject.
   */
  getCart(): Cart {
    return this.cartSubject.value;
  }

  /**
   * The function clears the contents of the cart and updates the local storage accordingly.
   */
  clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  /**
   * The function calculates the total price and count of items in the cart, converts the cart object
   * to JSON format, and stores it in the browser's local storage.
   */
  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    /* `localStorage.setItem("cart", cartJson);` is storing the `cartJson` string in the browser's
    local storage with the key `"cart"`. This allows the cart data to persist even if the user
    closes the browser or navigates away from the page. The next time the user visits the website,
    the `getCartFromLocalStorage()` method will retrieve the cart data from the local storage and
    initialize the `cart` property of the `CartService` class with that data. */
    localStorage.setItem(CART_KEY, cartJson);
    this.cartSubject.next(this.cart);
    // cartSubject is a private property of the `CartService` class that is of type
    // `BehaviorSubject<Cart>`. It is used to provide an observable of the current cart state
    // to any component that subscribes to it. The `next()` method is used to emit a new value
    // to the `cartSubject` Subject. This new value is the `cart` object that is passed to the
    // `next()` method. The `cartSubject` Subject is of type `BehaviorSubject<Cart>`, which means
    // that it will emit the current value to any new subscribers as soon as they subscribe to it.
  }

  /**
   * This function retrieves the cart object from local storage or creates a new one if it doesn't
   * exist.
   * @returns a Cart object. If there is a "cart" key in the localStorage, it will parse the value as
   * JSON and return a Cart object. If there is no "cart" key in the localStorage, it will return a new
   * Cart object.
   */
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem(CART_KEY);
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
