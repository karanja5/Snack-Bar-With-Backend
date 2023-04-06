/* The class "Food" defines properties for a food item, including its ID, name, description, price,
tags, image URL, favorite status, star rating, and wait time. */
export class Food {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  tags?: string[];
  imgUrl!: string;
  favorite?: boolean;
  stars!: number;
  waitTime!: string;
}
