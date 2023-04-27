/* The FoodPageComponent class is responsible for displaying a single food item and allowing the user
to add it to their cart. */
import { Component, OnInit } from "@angular/core";
/* `import { ActivatedRoute, Router } from "@angular/router";` is importing the `ActivatedRoute` and
`Router` classes from the `@angular/router` module. These classes are used in Angular to handle
routing and navigation within the application. `ActivatedRoute` provides access to information about
a route associated with a component, while `Router` is used to navigate between different routes in
the application. */
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { FoodService } from "src/app/services/food.service";
import { Food } from "src/app/shared/models/food";

@Component({
  selector: "app-food-page",
  templateUrl: "./food-page.component.html",
  styleUrls: ["./food-page.component.css"],
})
/* The FoodPageComponent class retrieves a specific food item from a food service and allows the user
to add it to their cart. */
export class FoodPageComponent implements OnInit {
  /* `food!: Food;` is declaring a property named `food` of type `Food`. The exclamation mark (`!`) is
  a non-null assertion operator, which tells TypeScript that the `food` property will be initialized
  at some point before it is used, even though it is not initialized in the constructor or in the
  `ngOnInit` method. This is a way to tell TypeScript that we are sure that the property will not be
  null or undefined at runtime, even though it is not initialized at compile time. */
  food!: Food;
  /**
   * This is a constructor function that initializes some services and subscribes to a route parameter
   * to get a specific food item by its ID.
   * @param {ActivatedRoute} activatedRoute - An instance of the ActivatedRoute class, which provides
   * access to information about a route associated with a component that is loaded in an outlet. It
   * contains information about the route's parameters, data, and query parameters.
   * @param {FoodService} foodService - FoodService is a service that provides methods to retrieve and
   * manipulate food-related data. It is injected into the constructor as a dependency.
   * @param {CartService} cartService - CartService is a service that provides functionality related to
   * managing a shopping cart. It is injected into the constructor as a private property, which means
   * it can be accessed within the class but not outside of it.
   * @param {Router} router - The `router` parameter is an instance of the Angular `Router` service,
   * which is used for navigating between different views or components in an Angular application. It
   * provides methods for navigating to a specific route, navigating back to the previous route, and
   * navigating to a route with optional parameters.
   */
  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    /* `activatedRoute.params.subscribe((params) => {...})` is subscribing to changes in the route
    parameters of the current route. When the route parameters change, the callback function inside
    the `subscribe` method is executed. */
    activatedRoute.params.subscribe((params) => {
      /* This code block is checking if the `params` object has a property named `id`. If it does, it
      calls the `getFoodById` method of the `foodService` object, passing in the `id` value as an
      argument. This method returns an `Observable` that emits a `Food` object, which is then
      subscribed to using the `subscribe` method. When the `Observable` emits a value, the callback
      function inside the `subscribe` method is executed, which assigns the emitted `Food` object to
      the `food` property of the `FoodPageComponent` class. Essentially, this code block is
      retrieving a specific food item from the `foodService` based on its ID, and assigning it to
      the `food` property of the component. */
      if (params.id) {
        foodService.getFoodById(params.id).subscribe((gottenFood) => {
          this.food = gottenFood;
        });
      }
    });
  }

  ngOnInit(): void {}

  /**
   * The function adds a food item to the cart and navigates to the cart page.
   */
  addToCart(): void {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl("/cart-page");
  }
  scrollToAddToCart() {
    const cartButton = document.querySelector("#cart-button");
    if (cartButton) {
      const top = cartButton.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
}
