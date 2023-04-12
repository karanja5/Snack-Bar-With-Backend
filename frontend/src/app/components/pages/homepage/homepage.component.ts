/* The HomepageComponent class retrieves and displays a list of food items based on search term or tag
parameters using the FoodService. */
import { Component, OnInit } from "@angular/core";
import { FoodService } from "src/app/services/food.service";
import { Food } from "src/app/shared/models/food";
/* `import { ActivatedRoute } from '@angular/router';` is importing the `ActivatedRoute` class from the
`@angular/router` module. This class is used to retrieve the current route's parameters, data, and
query strings. In the `HomepageComponent` class, it is used to retrieve the search term or tag
parameter from the current route and pass it to the `FoodService` to retrieve the corresponding food
items. */
import { ActivatedRoute } from "@angular/router";
/* `import { Observable } from 'rxjs';` is importing the `Observable` class from the `rxjs` library.
This class is used to create and manipulate observable streams of data, which are often used in
Angular applications for handling asynchronous operations such as HTTP requests. In the
`HomepageComponent` class, it is used to create an observable stream of `Food` objects returned by
the `FoodService` methods. */
import { Observable, switchMap } from "rxjs";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
/* The HomepageComponent class retrieves and displays a list of food items based on search term or tag
parameters using the FoodService. */
export class HomepageComponent implements OnInit {
  /* `foodsObjArr: Food[] = [];` is declaring and initializing an empty array of `Food` objects. This
  array will be populated with `Food` objects retrieved from the `FoodService` based on the search
  term or tag parameters. */
  foodsObjArr: Food[] = [];
  /**
   * This function sets up an observable to retrieve food data based on search term or tag parameters
   * from the activated route.
   * @param {FoodService} foodService - It is a dependency injection of the FoodService class, which is
   * likely a service that provides methods for retrieving food data from a backend API or database.
   * @param {ActivatedRoute} activatedRoute - The ActivatedRoute is a service provided by Angular that
   * contains information about a route associated with a component loaded in an outlet. It allows the
   * component to access information about the route parameters, query parameters, and other data
   * associated with the current route. In this code snippet, the ActivatedRoute is used to retrieve
   * the route
   */
  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute
  ) {
    /* `let foodsObservable: Observable<Food[]>;` is declaring a variable `foodsObservable` of type
    `Observable<Food[]>`. This variable will be used to store an observable stream of `Food` objects
    returned by the `FoodService` methods based on the search term or tag parameters. It is
    initialized to `undefined` at the time of declaration. */
    let foodsObservable: Observable<Food[]>;

    /* This code is setting up an observable to retrieve food data based on search term or tag
    parameters from the activated route. It is subscribing to the `params` observable of the
    `ActivatedRoute` service, which emits a new value whenever the route parameters change. When a
    new value is emitted, the code checks if the `searchTerm` or `tag` parameter is present in the
    route parameters. If either of them is present, it calls the corresponding method of the
    `FoodService` to retrieve the corresponding food items. If neither of them is present, it calls
    the `getAllFoods()` method of the `FoodService` to retrieve all food items. It then subscribes
    to the observable returned by the `FoodService` method and assigns the returned `Food` objects
    to the `foodsObjArr` array. */
    //  foodsObservable= activatedRoute.params.pipe(
    //     switchMap((params) => return this.foodService.getFoodBySearchTerm(
    //       params.searchTerm
    //     );
    //   )

    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservable = this.foodService.getFoodBySearchTerm(
          params.searchTerm
        );
      else if (params.tag)
        foodsObservable = this.foodService.getFoodByTag(params.tag);
      else foodsObservable = this.foodService.getAllFoods();

      /* `foodsObservable.subscribe((gottenFoods) => { this.foodsObjArr = gottenFoods;` is subscribing
      to the observable stream of `Food` objects returned by the `FoodService` methods based on the
      search term or tag parameters. When new `Food` objects are emitted by the observable, the
      callback function `(gottenFoods) => { this.foodsObjArr = gottenFoods; }` is executed, which
      assigns the emitted `Food` objects to the `foodsObjArr` array. This updates the array with the
      latest `Food` objects retrieved from the `FoodService`. */
      foodsObservable.subscribe((gottenFoods) => {
        this.foodsObjArr = gottenFoods;
      });
    });
  }

  ngOnInit(): void {}
}
