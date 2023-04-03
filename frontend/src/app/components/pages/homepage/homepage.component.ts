import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  foodsObjArr: Food[] = [];
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
      this.foodsObjArr = this.foodService.getFoodBySearchTerm(params.searchTerm);
      else if(params.tag)
      this.foodsObjArr = this.foodService.getFoodByTag(params.tag);
      else
      (this.foodsObjArr = this.foodService.getAllFoods());
    });
  }

  ngOnInit(): void {}
}
