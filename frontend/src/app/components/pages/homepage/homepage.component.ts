import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  foodsObjArr: Food[] = [];
  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute
  ) {
    let foodsObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservable = this.foodService.getFoodBySearchTerm(
          params.searchTerm
        );
      else if (params.tag)
        foodsObservable = this.foodService.getFoodByTag(params.tag);
      else foodsObservable = this.foodService.getAllFoods();

      foodsObservable.subscribe((serveFoods) => {
        this.foodsObjArr = serveFoods;
      });
    });
  }

  ngOnInit(): void {}
}
