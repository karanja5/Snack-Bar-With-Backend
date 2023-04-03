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
