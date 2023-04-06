/* The FoodService class provides methods to retrieve food and tag data from an API using HTTP requests
in an Angular application.  */
/* `HttpClient` is a service provided by Angular that allows the application to make HTTP
requests to a server to retrieve data. In this case, the `FoodService` is using
`HttpClient` to make requests to an API to retrieve food and tag data. */
import { Injectable } from "@angular/core";
import { Food } from "../shared/models/food";
import { Tags } from "../shared/models/tags";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_URL,
  TAGS_URL,
} from "../shared/constants/urls";

@Injectable({
  providedIn: "root",
})
/* The FoodService class provides methods to retrieve food and tag data from an API using HTTP requests
in TypeScript. */
export class FoodService {
  constructor(private http: HttpClient) {}

  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getFoodBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(TAGS_URL);
  }

  getFoodByTag(tag: string): Observable<Food[]> {
    return tag === "All"
      ? this.getAllFoods()
      : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }
  getFoodById(foodId: number): Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId) ?? new Food();
  }
}
