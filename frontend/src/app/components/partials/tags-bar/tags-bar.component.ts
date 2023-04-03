import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Tags } from 'src/app/shared/models/tags';

@Component({
  selector: 'app-tags-bar',
  templateUrl: './tags-bar.component.html',
  styleUrls: ['./tags-bar.component.css']
})
export class TagsBarComponent implements OnInit {

  tags? : Tags[];
  constructor(foodServices: FoodService,) {
    this.tags = foodServices.getAllTags();
   }

  ngOnInit() {
  }

}
