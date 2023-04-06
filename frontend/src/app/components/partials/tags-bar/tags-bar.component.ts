/* This is a TypeScript class that retrieves all tags from a food service and assigns them to a
property for use in an Angular component. */
import { Component, OnInit } from "@angular/core";
import { FoodService } from "src/app/services/food.service";
import { Tags } from "src/app/shared/models/tags";

@Component({
  selector: "app-tags-bar",
  templateUrl: "./tags-bar.component.html",
  styleUrls: ["./tags-bar.component.css"],
})
/* The TagsBarComponent class retrieves all tags from a FoodService and assigns them to a property
called "tags". */
export class TagsBarComponent implements OnInit {
  /* `tags?: Tags[];` is declaring a property called `tags` that is an array of `Tags` objects. The `?`
  indicates that the property is optional and may be undefined. */
  tags?: Tags[];
  /**
   * This constructor initializes the tags property by subscribing to the getAllTags method of a
   * FoodService.
   * @param {FoodService} foodServices - The parameter `foodServices` is an instance of the
   * `FoodService` class, which is likely a service that provides functionality related to food, such
   * as retrieving food items or tags. The constructor is using this service to retrieve all available
   * tags and storing them in the `tags` property of the class
   */
  constructor(foodServices: FoodService) {
    foodServices.getAllTags().subscribe((serveTags) => {
      this.tags = serveTags;
    });
  }

  ngOnInit() {}
}
