/* The CartItem class represents an item in a shopping cart that contains a Food object, quantity, and
price. */
import { Food } from "./food";

export class CartItem {
  constructor(public food: Food) {}
  quantity: number = 1;
  price: number = this.food.price;
}
