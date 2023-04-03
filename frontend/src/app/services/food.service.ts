import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sampleFoods, sampleTags } from 'src/data';
import { Tags } from '../shared/models/tags';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}
  getAllFoods(): Food[] {
    return sampleFoods;
  }

  getFoodBySearchTerm(searchTerm: string): Food[] {
    return this.getAllFoods().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getAllTags(): Tags[] {
    return sampleTags;
  }
  getFoodByTag(tag: string): Food[] {
    return tag === 'All'
      ? this.getAllFoods()
      : this.getAllFoods().filter((food) => food.tags?.includes(tag));
  }
  getFoodById(foodId: number) : Food{
    return this.getAllFoods().find((food) => food.id == foodId) ?? new Food();
  }

}
